import { Router } from 'express'
import w from '../config/wrap.js'
import * as c from '../controllers/clientController.js'

const router = Router()

// Le préfixe est retiré par app.use() dans index.js
router.get('/', w(c.liste))
router.get('/add', w(c.formAjout))
router.post('/add', w(c.ajouter))
router.get('/edit/:id', w(c.formModif))
router.post('/edit/:id', w(c.modifier))
router.post('/delete/:id', w(c.supprimer))

export default router
