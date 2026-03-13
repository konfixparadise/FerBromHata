'use strict'

import logger from "../utils/logger.js"
import catalogStore from "../models/catalog-store.js"

const details = {
    createView(request, response) {
        logger.info("Details page loading!")
        
        const catalogId = request.params.id
        logger.debug(`Catalog id = ${catalogId}`)
        const catalog = catalogStore.getCatalogById(catalogId)

        const viewData = {
            title: catalog.title,
            catalog: catalog
        }

        response.render('catalog-details', viewData)
    }
}

export default details;