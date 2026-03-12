'use strict'

import logger from "../utils/logger.js"
import catalogStore from "../models/catalog-store.js"

const catalog = {
  createView(request, response) {
    logger.info("Catalog page loading!")
    
    const viewData = {
      title: 'Catalog',
      catalogs: catalogStore.getAllProducts()
    }
    
    logger.debug(viewData.catalogs)

    response.render('catalog', viewData)
  }
  
}

export default catalog
