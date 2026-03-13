'use strict'

import logger from "../utils/logger.js"
import catalogStore from "../models/catalog-store.js"

const catalog = {
  createView(request, response) {
    logger.info("Catalog page loading!")
    
    let selectedCategories = request.query.category
    let displayCatalogs = [];
    const allCatalogs = catalogStore.getAllCatalogs()

    const memoryFilter = {
      farm: false,
      fields: false,
      green: false,
      smart: false,
      automated: false,
      livestock: false,
      infrastructure: false
    }

    if (selectedCategories) {
      if(!Array.isArray(selectedCategories)) {
        selectedCategories = [selectedCategories]
      }

      memoryFilter.farm = selectedCategories.includes("Farm Solutions")
      memoryFilter.fields = selectedCategories.includes("Fields Solutions")
      memoryFilter.green = selectedCategories.includes("Green Energy")
      memoryFilter.smart = selectedCategories.includes("Smart Monitoring")
      memoryFilter.automated = selectedCategories.includes("Automated Labor")
      memoryFilter.livestock = selectedCategories.includes("Livestock Welfare")
      memoryFilter.infrastructure = selectedCategories.includes("Infrastructure")

      displayCatalogs = catalogStore.getCatalogsByTags(selectedCategories)
    } else displayCatalogs = allCatalogs

    const searchDataAll = allCatalogs.map(catalog => ({
      title: catalog.title,
      url: `/details/${catalog.id}`
    }))

    const viewData = {
      title: 'Catalog',
      catalogs: displayCatalogs,
      memoryFilter: memoryFilter,
      searchData: JSON.stringify(searchDataAll)
    }
    
    logger.debug(viewData.catalogs)

    response.render('catalog', viewData)
  }
  
}

export default catalog
