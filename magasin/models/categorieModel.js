import db from '../config/db.js'

export const findAll = async () => (await db.query('SELECT * FROM categorie ORDER BY Nom'))[0]

export const findById = async (id) =>
  (await db.query('SELECT * FROM categorie WHERE Id = ?', [id]))[0][0]

export const create = (d) => db.query('INSERT INTO categorie (Nom) VALUES (?)', [d.Nom])

export const update = (id, d) => db.query('UPDATE categorie SET Nom = ? WHERE Id = ?', [d.Nom, id])

export const remove = (id) => db.query('DELETE FROM categorie WHERE Id = ?', [id])
