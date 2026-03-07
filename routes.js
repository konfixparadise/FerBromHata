import express from 'express'
const router = express.Router()

import start from './controllers/start.js'
import catalog from './controllers/catalog.js'
import about from './controllers/about.js'

router.get('/', start.createView)
router.get('/catalog', catalog.createView)
router.get('/about', about.createView)
router.get('/error', (request, response) => response.status(404).end('Page not found!'))

export default router