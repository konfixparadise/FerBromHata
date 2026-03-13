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
    }
}

export default catalogStore