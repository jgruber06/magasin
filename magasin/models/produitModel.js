import db from '../config/db.js'

export const findAll = async () =>
  (await db.query(
    `SELECT p.*, c.Nom AS Categorie
     FROM produit p JOIN categorie c ON c.Id = p.Id_categorie
     ORDER BY p.Id DESC`))[0]

export const findById = async (id) =>
  (await db.query('SELECT * FROM produit WHERE Id = ?', [id]))[0][0]

export const create = (d) =>
  db.query(
    'INSERT INTO produit (Nom, Description, Prix, Stock, Id_categorie) VALUES (?,?,?,?,?)',
    [d.Nom, d.Description || null, d.Prix, d.Stock, d.Id_categorie])

export const update = (id, d) =>
  db.query(
    'UPDATE produit SET Nom=?, Description=?, Prix=?, Stock=?, Id_categorie=? WHERE Id=?',
    [d.Nom, d.Description || null, d.Prix, d.Stock, d.Id_categorie, id])

export const remove = (id) => db.query('DELETE FROM produit WHERE Id = ?', [id])
