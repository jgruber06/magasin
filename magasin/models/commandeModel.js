import db from '../config/db.js'

export const STATUTS = ['En cours', 'Expédiée', 'Livrée', 'Annulée']
const erreur = (status, message) => Object.assign(new Error(message), { status })

export const findAll = async () =>
  (await db.query(
    `SELECT c.Id, c.Date_commande, c.Statut, c.Montant_total, cl.Nom, cl.Prenom,
       (SELECT GROUP_CONCAT(CONCAT(ct.Quantite, ' × ', p.Nom) SEPARATOR ', ')
          FROM contient ct JOIN produit p ON p.Id = ct.Id_produit
         WHERE ct.Id_commande = c.Id) AS Produits
     FROM commande c JOIN client cl ON cl.Id = c.Id_client
     ORDER BY c.Id DESC`))[0]

// Création en TRANSACTION : tout réussit ou rien n'est enregistré
export const create = async (idClient, lignes) => {
  if (!idClient || !lignes.length) throw erreur(400, 'Il faut un client et au moins un produit')

  const qte = new Map() // fusionne les doublons de produit
  for (const l of lignes) {
    const n = parseInt(l.Quantite, 10)
    if (!(n > 0)) throw erreur(400, 'Quantité invalide')
    const id = Number(l.Id_produit)
    qte.set(id, (qte.get(id) || 0) + n)
  }

  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    const [r] = await conn.query(
      'INSERT INTO commande (Date_commande, Statut, Id_client) VALUES (CURDATE(), ?, ?)',
      ['En cours', idClient])
    let total = 0
    for (const [id, n] of qte) {
      const [[p]] = await conn.query('SELECT Nom, Prix, Stock FROM produit WHERE Id = ? FOR UPDATE', [id])
      if (!p) throw erreur(400, 'Produit inexistant')
      if (p.Stock < n) throw erreur(400, `Stock insuffisant pour ${p.Nom} (reste ${p.Stock})`)
      await conn.query(
        'INSERT INTO contient (Id_commande, Id_produit, Quantite, Prix_unitaire) VALUES (?,?,?,?)',
        [r.insertId, id, n, p.Prix])
      await conn.query('UPDATE produit SET Stock = Stock - ? WHERE Id = ?', [n, id])
      total += p.Prix * n
    }
    await conn.query('UPDATE commande SET Montant_total = ? WHERE Id = ?',
      [Math.round(total * 100) / 100, r.insertId])
    await conn.commit()
    return r.insertId
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}

export const setStatut = async (id, statut) => {
  if (!STATUTS.includes(statut)) throw erreur(400, 'Statut invalide')
  await db.query('UPDATE commande SET Statut = ? WHERE Id = ?', [statut, id])
}

// Remet le stock, puis supprime (contient part en cascade)
export const remove = async (id) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query(
      `UPDATE produit p JOIN contient ct ON ct.Id_produit = p.Id
       SET p.Stock = p.Stock + ct.Quantite WHERE ct.Id_commande = ?`, [id])
    await conn.query('DELETE FROM commande WHERE Id = ?', [id])
    await conn.commit()
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}
