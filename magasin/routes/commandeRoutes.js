import { Router } from 'express'
import w from '../config/wrap.js'
import * as c from '../controllers/commandeController.js'

const router = Router()

router.get('/', w(c.liste))
router.get('/add', w(c.formAjout))
router.post('/add', w(c.ajouter))
router.post('/statut/:id', w(c.changerStatut))
router.post('/delete/:id', w(c.supprimer))

export default router
