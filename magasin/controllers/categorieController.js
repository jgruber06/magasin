import * as Categorie from '../models/categorieModel.js'

export const liste = async (req, res) =>
  res.render('categories/liste', { categories: await Categorie.findAll(), erreur: req.query.erreur })

export const formAjout = (req, res) => res.render('categories/formulaire', { categorie: {} })

export const ajouter = async (req, res) => {
  await Categorie.create(req.body)
  res.redirect('/categories')
}

export const formModif = async (req, res) => {
  const categorie = await Categorie.findById(req.params.id)
  if (!categorie) return res.status(404).send('Catégorie introuvable')
  res.render('categories/formulaire', { categorie })
}

export const modifier = async (req, res) => {
  await Categorie.update(req.params.id, req.body)
  res.redirect('/categories')
}

export const supprimer = async (req, res) => {
  try {
    await Categorie.remove(req.params.id)
    res.redirect('/categories')
  } catch (e) {
    if (e.code === 'ER_ROW_IS_REFERENCED_2') return res.redirect('/categories?erreur=utilise')
    throw e
  }
}
