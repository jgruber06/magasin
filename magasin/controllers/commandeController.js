import * as Commande from '../models/commandeModel.js'
import * as Client from '../models/clientModel.js'
import * as Produit from '../models/produitModel.js'

const formulaire = async (res, erreur, status = 200) =>
  res.status(status).render('commandes/formulaire', {
    clients: await Client.findAll(),
    produits: await Produit.findAll(),
    erreur
  })

export const liste = async (req, res) =>
  res.render('commandes/liste', { commandes: await Commande.findAll(), statuts: Commande.STATUTS })

export const formAjout = (req, res) => formulaire(res, null)

export const ajouter = async (req, res) => {
  // Les champs répétés arrivent en tableau (ou en texte seul s'il n'y en a qu'un)
  const produits = [].concat(req.body.produit || [])
  const quantites = [].concat(req.body.quantite || [])
  const lignes = produits
    .map((p, i) => ({ Id_produit: p, Quantite: quantites[i] }))
    .filter((l) => l.Id_produit)
  try {
    await Commande.create(Number(req.body.Id_client), lignes)
    res.redirect('/commandes')
  } catch (e) {
    if (e.status === 400) return formulaire(res, e.message, 400)
    throw e
  }
}

export const changerStatut = async (req, res) => {
  await Commande.setStatut(req.params.id, req.body.Statut)
  res.redirect('/commandes')
}

export const supprimer = async (req, res) => {
  await Commande.remove(req.params.id)
  res.redirect('/commandes')
}
