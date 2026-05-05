'use strict'

import logger from '../utils/logger.js'
import JsonStore from './json-store.js'

const catalogStore = {
    store: new JsonStore('./models/catalog-store.json', { catalogCollection: [] }),
    collection: 'catalogCollection',
    tagsArray: 'tags',
    productArray: 'products',

    getAllCatalogs() {
        return this.store.findAll(this.collection)
    },

    getCatalogsByTags(tags) {
        return this.store.findBy(this.collection, (catalog) => {
            return catalog.tags && tags.every(tag => catalog.tags.includes(tag))
        })
    },

    getCatalogById(id) {
        return this.store.findOneBy(this.collection, (catalog) => catalog.id === id)
    },

    async addCatalog(catalog, file) {
        if (file) {
            try {
                catalog.picture = await this.store.addToCloudinary(file)
            } catch (err) {
                logger.error('Cloudinary upload failed: ' + err)
            }
        }
        await this.store.addCollection(this.collection, catalog)
    },

    async removeCatalogById(id) {
        const catalog = this.getCatalogById(id)
        if (!catalog) return

        if (catalog.picture && catalog.picture.public_id) {
            try {
                await this.store.deleteFromCloudinary(catalog.picture.public_id)
                logger.info('Cloudinary image deleted')
            } catch (err) {
                logger.error('Failed to delete Cloudinary image: ' + err)
            }
        }
        await this.store.removeCollection(this.collection, catalog)
    },

    async editCatalog(id, updated, file) {
        if (file) {
            const existing = this.getCatalogById(id)
            if (existing.picture && existing.picture.public_id) {
                try {
                    await this.store.deleteFromCloudinary(existing.picture.public_id)
                } catch (err) {
                    logger.error('Failed to delete old Cloudinary image: ' + err)
                }
            }
            try {
                updated.picture = await this.store.addToCloudinary(file)
            } catch (err) {
                logger.error('Cloudinary upload failed: ' + err)
            }
        }
        await this.store.editCollection(this.collection, id, updated)
    },

    async addProduct(catalogId, product, file) {
        if (file) {
            try {
                product.picture = await this.store.addToCloudinary(file)
            } catch (err) {
                logger.error('Cloudinary upload failed: ' + err)
            }
        }
        await this.store.addItem(this.collection, catalogId, this.productArray, product)
    },

    async removeProduct(catalogId, productId) {
        const catalog = this.getCatalogById(catalogId)
        const product = catalog.products.find(p => p.id === productId)

        if (product && product.picture && product.picture.public_id) {
            try {
                await this.store.deleteFromCloudinary(product.picture.public_id)
            } catch (err) {
                logger.error('Failed to delete Cloudinary image: ' + err)
            }
        }
        await this.store.removeItem(this.collection, catalogId, this.productArray, productId)
    },

    async editProduct(catalogId, productId, updated, file) {
        if (file) {
            const catalog = this.getCatalogById(catalogId)
            const existing = catalog.products.find(p => p.id === productId)
            if (existing && existing.picture && existing.picture.public_id) {
                try {
                    await this.store.deleteFromCloudinary(existing.picture.public_id)
                } catch (err) {
                    logger.error('Failed to delete old Cloudinary image: ' + err)
                }
            }
            try {
                updated.picture = await this.store.addToCloudinary(file)
            } catch (err) {
                logger.error('Cloudinary upload failed: ' + err)
            }
        }
        await this.store.editItem(this.collection, catalogId, productId, this.productArray, updated)
    }
}

export default catalogStore