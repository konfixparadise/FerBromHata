'use strict'

import { v4 as uuidv4 } from 'uuid'

import logger from '../utils/logger.js'
import accounts from './accounts.js'
import catalogStore from '../models/catalog-store.js'

const adminCatalogs = {
    createView(request, response) {
        logger.info('Admin catalogs page loading!')
        const loggedInUser = accounts.getCurrentUser(request)

        const viewData = {
            title: 'Manage Catalogs',
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : '',
            adminSection: 'Catalogs',
            catalogs: catalogStore.getAllCatalogs()
        }

        response.render('admin-catalogs', viewData)
    },

    async addCatalog(request, response) {
        logger.info('Adding new catalog')
        const loggedInUser = accounts.getCurrentUser(request)

        const tagsRaw = request.body.tags || ''
        const tagsArray = tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0)

        const newCatalog = {
            id: uuidv4(),
            userid: loggedInUser.id,
            title: request.body.title,
            picture: {
                url: '/catalogPictures/default-catalog.png',
                public_id: null
            },
            tags: tagsArray,
            description: request.body.description,
            products: []
        }

        await catalogStore.addCatalog(newCatalog)
        response.redirect('/admin/catalogs')
    },

    async deleteCatalog(request, response) {
        const catalogId = request.params.id
        logger.info(`Deleting catalog ${catalogId}`)
        await catalogStore.removeCatalogById(catalogId)
        response.redirect('/admin/catalogs')
    },

    async updateCatalog(request, response) {
        const catalogId = request.params.id
        logger.info(`Updating catalog ${catalogId}`)
        const existing = catalogStore.getCatalogById(catalogId)

        const tagsRaw = request.body.tags || ''
        const tagsArray = tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0)

        const updated = {
            id: existing.id,
            userid: existing.userid,
            title: request.body.title,
            picture: existing.picture,
            tags: tagsArray,
            description: request.body.description,
            products: existing.products
        }

        await catalogStore.editCatalog(catalogId, updated)
        response.redirect('/admin/catalogs')
    },

    detailView(request, response) {
        logger.info('Admin catalog detail loading!')
        const loggedInUser = accounts.getCurrentUser(request)

        const catalogId = request.params.id
        const catalog = catalogStore.getCatalogById(catalogId)

        const viewData = {
            title: 'Manage: ' + catalog.title,
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : '',
            adminSection: 'Catalogs',
            catalog: catalog
        }

        response.render('admin-catalog-detail', viewData)
    },

    async addProduct(request, response) {
        const catalogId = request.params.id
        logger.info(`Adding product to catalog ${catalogId}`)

        const newProduct = {
            id: uuidv4(),
            title: request.body.title,
            picture: {
                url: '/productPictures/default-product.png',
                public_id: null
            },
            description: request.body.description
        }

        await catalogStore.addProduct(catalogId, newProduct)
        response.redirect('/admin/catalogs/' + catalogId)
    },

    async deleteProduct(request, response) {
        const catalogId = request.params.id
        const productId = request.params.productId
        logger.info(`Deleting product ${productId} from catalog ${catalogId}`)
        await catalogStore.removeProduct(catalogId, productId)
        response.redirect('/admin/catalogs/' + catalogId)
    },

    async updateProduct(request, response) {
        const catalogId = request.params.id
        const productId = request.params.productId
        logger.info(`Updating product ${productId} in catalog ${catalogId}`)

        const catalog = catalogStore.getCatalogById(catalogId)
        const existing = catalog.products.find(p => p.id === productId)

        const updated = {
            id: existing.id,
            title: request.body.title,
            picture: existing.picture,
            description: request.body.description
        }

        await catalogStore.editProduct(catalogId, productId, updated)
        response.redirect('/admin/catalogs/' + catalogId)
    }
}

export default adminCatalogs