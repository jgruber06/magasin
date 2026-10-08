import 'dotenv/config'
import express from 'express'
import produitRoutes from './routes/produitRoutes.js'
import categorieRoutes from './routes/categorieRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import commandeRoutes from './routes/commandeRoutes.js'

const app = express()
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: true }))  // lit les données des formulaires
app.use(express.static('public'))
app.use('/semantic', express.static('node_modules/semantic-ui-css/'))

// Routes
app.get('/', (req, res) => res.redirect('/produits'))
app.use('/produits', produitRoutes)
app.use('/categories', categorieRoutes)
app.use('/clients', clientRoutes)
app.use('/commandes', commandeRoutes)

// 404 puis erreur 500
app.use((req, res) => res.status(404).send('Page introuvable'))
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Erreur serveur')
})

app.listen(process.env.PORT || 3000, () => console.log('Le serveur Magasin est prêt.'))
