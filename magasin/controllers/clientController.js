import bcrypt from 'bcryptjs'
import * as Client from '../models/clientModel.js'

const formulaire = (res, client, erreur) => res.render('clients/formulaire', { leClient: client, erreur })

export const liste = async (req, res) =>
  res.render('clients/liste', { clients: await Client.findAll(), erreur: req.query.erreur })

export const formAjout = (req, res) => formulaire(res, {}, null)

export const ajouter = async (req, res) => {
  if (!req.body.MDP) return formulaire(res, req.body, 'Le mot de passe est obligatoire')
  try {
    await Client.create(req.body, bcrypt.hashSync(req.body.MDP, 10))
    res.redirect('/clients')
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return formulaire(res, req.body, 'Cet email est déjà utilisé')
    throw e
  }
}

export const formModif = async (req, res) => {
  const client = await Client.findById(req.params.id)
  if (!client) return res.status(404).send('Client introuvable')
  formulaire(res, client, null)
}

export const modifier = async (req, res) => {
  const hash = req.body.MDP ? bcrypt.hashSync(req.body.MDP, 10) : null
  try {
    await Client.update(req.params.id, req.body, hash)
    res.redirect('/clients')
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY')
      return formulaire(res, { ...req.body, Id: req.params.id }, 'Cet email est déjà utilisé')
    throw e
  }
}

export const supprimer = async (req, res) => {
  try {
    await Client.remove(req.params.id)
    res.redirect('/clients')
  } catch (e) {
    if (e.code === 'ER_ROW_IS_REFERENCED_2') return res.redirect('/clients?erreur=utilise')
    throw e
  }
}
