'use strict'

import logger from "../utils/logger.js"

const catalog = {
  createView(request, response) {
    logger.info("Catalog page loading!")
    
    const viewData = {
      title: 'FerBromHata App Catalog'
    }

    response.render('catalog', viewData)
  }
}

export default catalog
