import db from '../config/db.js'

const COLS = 'Id, Nom, Prenom, Email, Adresse_livraison' // jamais MDP_hash

export const findAll = async () =>
  (await db.query(`SELECT ${COLS} FROM client ORDER BY Id DESC`))[0]

export const findById = async (id) =>
  (await db.query(`SELECT ${COLS} FROM client WHERE Id = ?`, [id]))[0][0]

export const create = (d, hash) =>
  db.query(
    'INSERT INTO client (Nom, Prenom, Email, Adresse_livraison, MDP_hash) VALUES (?,?,?,?,?)',
    [d.Nom, d.Prenom, d.Email, d.Adresse_livraison, hash])

// hash vide : le mot de passe n'est pas modifié
export const update = async (id, d, hash) => {
  if (hash) {
    return db.query(
      'UPDATE client SET Nom=?, Prenom=?, Email=?, Adresse_livraison=?, MDP_hash=? WHERE Id=?',
      [d.Nom, d.Prenom, d.Email, d.Adresse_livraison, hash, id])
  }
  return db.query(
    'UPDATE client SET Nom=?, Prenom=?, Email=?, Adresse_livraison=? WHERE Id=?',
    [d.Nom, d.Prenom, d.Email, d.Adresse_livraison, id])
}

export const remove = (id) => db.query('DELETE FROM client WHERE Id = ?', [id])
