'use strict'

import logger from '../utils/logger.js'
import JsonStore from './json-store.js'

const catalogStore = {
    store: new JsonStore('./models/catalog-store.json', { catalogCollection: [] }),
    collection: 'catalogCollection',
    tagsArray: 'tags',
    productArray: 'products',

    getAllProducts() {
        return this.store.findAll(this.collection)
    }
}

export default catalogStore