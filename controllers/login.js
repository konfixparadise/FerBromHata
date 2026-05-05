'use strict'

import logger from '../utils/logger.js'
import accounts from './accounts.js'

const login = {
    createView(request, response) {
        logger.info('Login page loading!')
        const loggedInUser = accounts.getCurrentUser(request)

        const viewData = {
            title: 'Login / Register',
            loggedInUser: loggedInUser,
            isAdmin: loggedInUser && loggedInUser.isAdmin,
            fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : '',
            errorPassword: request.query.error === 'password',
            errorEmail: request.query.error === 'email',
            errorLogin: request.query.error === 'login'
        }

        response.render('login', viewData)
    }
}

export default login