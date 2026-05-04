'use strict'

import logger from '../utils/logger.js'

const login = {
    createView(request, response) {
        logger.info('Login page loading!')

        const viewData = {
            title: 'Login / Register'
        }

        response.render('login', viewData)
    }
}

export default login