import logger from "./utils/logger.js"
import express from 'express'
const router = express.Router()

import start from './controllers/start.js'
import catalog from './controllers/catalog.js'
import about from './controllers/about.js'
import details from './controllers/catalog-details.js'
import login from './controllers/login.js'
import accounts from './controllers/accounts.js'

router.get('/', start.createView)
router.get('/catalog', catalog.createView)
router.get('/details/:id', details.createView)
router.get('/about', about.createView)
router.get('/login', login.createView)
router.post('/register', accounts.register)
router.post('/authenticate', accounts.authenticate)
router.get('/logout', accounts.logout)

router.get('/error', (request, response) => response.status(404).end('Page not found!'))

export default router