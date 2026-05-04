'use strict'

import logger from "../utils/logger.js"
import catalogStore from "../models/catalog-store.js"
import accounts from "./accounts.js"

const details = {
    createView(request, response) {
        logger.info("Details page loading!")
        const loggedInUser = accounts.getCurrentUser(request)

        const catalogId = request.params.id
        logger.debug(`Catalog id = ${catalogId}`)
        const catalog = catalogStore.getCatalogById(catalogId)

        const viewData = {
            title: catalog.title,
            catalog: catalog,
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : ''
        }

        response.render('catalog-details', viewData)
    }
}

export default details;