'use strict'

import express, { response } from 'express'
import {create} from 'express-handlebars'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import routes from './routes.js'
import logger from './utils/logger.js'

import appStore from "./models/app-store.js"

const app = express()
const port = 3000;

app.use(express.static("public"))
app.use((request, response, next) => {
    response.locals.info = appStore.getAppInfo();
    response.locals.currentYear = new Date().getFullYear()
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))

const handlebars = create({
    extname: '.hbs',
    helpers: {
        uppercase: (input) => {
            if (!input) return ''
            return input.toUpperCase()
        },
        formatDate: (date) => {
            if (!date) return ''
            const d = new Date(date)
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
            return d.toLocaleDateString('en-IE', options)
        },
        productCount: (products) => {
            if (!products || products.length === 0) return 'Empty catalog'
            if (products.length === 1) return '1 product'
            return products.length + ' products'
        }
    }
})
app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

app.use("/", routes)

app.listen(port, () => logger.info(`Your app running on port ${port}!`))
