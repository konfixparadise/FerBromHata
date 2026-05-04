'use strict'

import logger from "../utils/logger.js"
import accounts from "./accounts.js"

const about = {
    createView(request, response) {
        logger.info("About page loading!")
        const loggedInUser = accounts.getCurrentUser(request)

        const viewData = {
            title: 'About',
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : ''
        }

        response.render('about', viewData)
    }
}

export default about