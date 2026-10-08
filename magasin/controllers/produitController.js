import * as Produit from '../models/produitModel.js'
import * as Categorie from '../models/categorieModel.js'

export const liste = async (req, res) =>
  res.render('produits/liste', { produits: await Produit.findAll(), erreur: req.query.erreur })

export const formAjout = async (req, res) =>
  res.render('produits/formulaire', { produit: {}, categories: await Categorie.findAll() })

export const ajouter = async (req, res) => {
  await Produit.create(req.body)
  res.redirect('/produits')
}

export const formModif = async (req, res) => {
  const produit = await Produit.findById(req.params.id)
  if (!produit) return res.status(404).send('Produit introuvable')
  res.render('produits/formulaire', { produit, categories: await Categorie.findAll() })
}

export const modifier = async (req, res) => {
  await Produit.update(req.params.id, req.body)
  res.redirect('/produits')
}

export const supprimer = async (req, res) => {
  try {
    await Produit.remove(req.params.id)
    res.redirect('/produits')
  } catch (e) {
    if (e.code === 'ER_ROW_IS_REFERENCED_2') return res.redirect('/produits?erreur=utilise')
    throw e
  }
}
