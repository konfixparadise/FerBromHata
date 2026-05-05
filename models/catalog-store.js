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
        return  this.store.findOneBy(this.collection, (catalog) => catalog.id === id)
    },

    async addCatalog(catalog) {
        await this.store.addCollection(this.collection, catalog)
    },

    async removeCatalogById(id) {
        const catalog = this.getCatalogById(id)
        if (catalog) {
            await this.store.removeCollection(this.collection, catalog)
        }
    },

    async editCatalog(id, updated) {
        await this.store.editCollection(this.collection, id, updated)
    },

    async addProduct(catalogId, product) {
        await this.store.addItem(this.collection, catalogId, this.productArray, product)
    },

    async removeProduct(catalogId, productId) {
        await this.store.removeItem(this.collection, catalogId, this.productArray, productId)
    },

    async editProduct(catalogId, productId, updated) {
        await this.store.editItem(this.collection, catalogId, productId, this.productArray, updated)
    }
}

export default catalogStore