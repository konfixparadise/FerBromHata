'use strict'

import logger from '../utils/logger.js'
import accounts from './accounts.js'

const admin = {
    createView(request, response) {
        logger.info('Admin panel loading!')
        const loggedInUser = accounts.getCurrentUser(request)

        const viewData = {
            title: 'Admin Panel',
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : '',
            adminSection: 'Dashboard'
        }

        response.render('admin', viewData)
    }
}

export default admin