'use strict'

import catalogStore from '../models/catalog-store.js'
import userStore from '../models/user-store.js'

const stats = {
    appStats() {
        const catalogs = catalogStore.getAllCatalogs()
        const users = userStore.getAllUsers()

        const numCatalogs = catalogs.length
        const numProducts = catalogs.reduce((total, c) => total + c.products.length, 0)
        const numUsers = users.length
        const avgProducts = numCatalogs > 0 ? (numProducts / numCatalogs).toFixed(2) : 0

        let mostProductsTitle = '—'
        let leastProductsTitle = '—'
        let mostProductsCount = 0
        let leastProductsCount = 0

        if (numCatalogs > 0) {
            const productCounts = catalogs.map(c => c.products.length)
            mostProductsCount = Math.max(...productCounts)
            leastProductsCount = Math.min(...productCounts)
            mostProductsTitle = catalogs.filter(c => c.products.length === mostProductsCount).map(c => c.title).join(', ')
            leastProductsTitle = catalogs.filter(c => c.products.length === leastProductsCount).map(c => c.title).join(', ')
        }

        return {
            numCatalogs: numCatalogs,
            numProducts: numProducts,
            numUsers: numUsers,
            avgProducts: avgProducts,
            mostProductsTitle: mostProductsTitle,
            leastProductsTitle: leastProductsTitle,
            mostProductsCount: mostProductsCount,
            leastProductsCount: leastProductsCount
        }
    },

    userStats(userId) {
        const allCatalogs = catalogStore.getAllCatalogs()
        const userCatalogs = allCatalogs.filter(c => c.userid === userId)

        const numCatalogs = userCatalogs.length
        const numProducts = userCatalogs.reduce((total, c) => total + c.products.length, 0)
        const avgProducts = numCatalogs > 0 ? (numProducts / numCatalogs).toFixed(2) : 0

        let mostProductsTitle = '—'
        let leastProductsTitle = '—'
        let mostProductsCount = 0
        let leastProductsCount = 0

        if (numCatalogs > 0) {
            const productCounts = userCatalogs.map(c => c.products.length)
            mostProductsCount = Math.max(...productCounts)
            leastProductsCount = Math.min(...productCounts)
            mostProductsTitle = userCatalogs.filter(c => c.products.length === mostProductsCount).map(c => c.title).join(', ')
            leastProductsTitle = userCatalogs.filter(c => c.products.length === leastProductsCount).map(c => c.title).join(', ')
        }

        return {
            numCatalogs: numCatalogs,
            numProducts: numProducts,
            avgProducts: avgProducts,
            mostProductsTitle: mostProductsTitle,
            leastProductsTitle: leastProductsTitle,
            mostProductsCount: mostProductsCount,
            leastProductsCount: leastProductsCount
        }
    }
}

export default stats