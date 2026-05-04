'use strict'

import logger from "../utils/logger.js"
import appStore from "../models/app-store.js"
import accounts from "./accounts.js"

const start = {
    createView(request, response) {
        logger.info("Start page loading!")
        const loggedInUser = accounts.getCurrentUser(request)

        const viewData = {
            title: "FerBromHata",
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : ''
        }

        response.render('start', viewData)
    }
}

export default start