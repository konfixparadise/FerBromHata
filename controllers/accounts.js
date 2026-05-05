'use strict'

import { v4 as uuidv4 } from 'uuid'

import logger from '../utils/logger.js'
import userStore from '../models/user-store.js'

const accounts = {
    async register(request, response) {
        const password = request.body.password || ''
        const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

        if (!passwordRule.test(password)) {
            logger.info('Registration blocked, weak password')
            return response.redirect('/login?error=password')
        }

        const newUser = {
            id: uuidv4(),
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: password,
            isAdmin: false,
            picture: { url: '/photos/default_avatar.png', public_id: null }
        }

        const existing = userStore.getUserByEmail(newUser.email)
        if (existing) {
            logger.info(`Registration blocked, email already used: ${newUser.email}`)
            return response.redirect('/login?error=email')
        }

        const file = request.files ? request.files.profilePic : null
        await userStore.addUser(newUser, file)
        logger.info(`Registered new user: ${newUser.email}`)
        response.cookie('ferbromhata', newUser.email)
        response.redirect('/')
    },

    authenticate(request, response) {
        const user = userStore.getUserByEmail(request.body.email)
        if (user && user.password === request.body.password) {
            logger.info(`Logging in: ${user.email}`)
            response.cookie('ferbromhata', user.email)
            response.redirect('/')
        } else {
            logger.info(`Login failed for: ${request.body.email}`)
            response.redirect('/login?error=login')
        }
    },

    logout(request, response) {
        logger.info('Logging out')
        response.cookie('ferbromhata', '')
        response.redirect('/')
    },

    getCurrentUser(request) {
        const userEmail = request.cookies.ferbromhata
        if (!userEmail) return null
        return userStore.getUserByEmail(userEmail)
    },

    requireAdmin(request, response, next) {
        const loggedInUser = accounts.getCurrentUser(request)
        if (loggedInUser && loggedInUser.isAdmin) {
            next()
        } else {
            logger.info('Admin access denied')
            response.redirect('/')
        }
    }
    
}

export default accounts