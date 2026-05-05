import logger from "./utils/logger.js"
import express from 'express'
const router = express.Router()

import start from './controllers/start.js'
import catalog from './controllers/catalog.js'
import about from './controllers/about.js'
import details from './controllers/catalog-details.js'
import login from './controllers/login.js'
import accounts from './controllers/accounts.js'
import admin from './controllers/admin.js'
import adminCatalogs from './controllers/admin-catalogs.js'

router.get('/', start.createView)
router.get('/catalog', catalog.createView)
router.get('/details/:id', details.createView)
router.get('/about', about.createView)

router.get('/login', login.createView)
router.post('/register', accounts.register)
router.post('/authenticate', accounts.authenticate)
router.get('/logout', accounts.logout)

router.get('/admin', accounts.requireAdmin, admin.createView)
router.get('/admin/catalogs', accounts.requireAdmin, adminCatalogs.createView)
router.post('/admin/catalogs/add', accounts.requireAdmin, adminCatalogs.addCatalog)
router.get('/admin/catalogs/delete/:id', accounts.requireAdmin, adminCatalogs.deleteCatalog)
router.post('/admin/catalogs/update/:id', accounts.requireAdmin, adminCatalogs.updateCatalog)
router.get('/admin/catalogs/:id', accounts.requireAdmin, adminCatalogs.detailView)
router.post('/admin/catalogs/:id/products/add', accounts.requireAdmin, adminCatalogs.addProduct)
router.get('/admin/catalogs/:id/products/delete/:productId', accounts.requireAdmin, adminCatalogs.deleteProduct)
router.post('/admin/catalogs/:id/products/update/:productId', accounts.requireAdmin, adminCatalogs.updateProduct)

router.get('/error', (request, response) => response.status(404).end('Page not found!'))

export default router