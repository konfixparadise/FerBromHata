'use strict'

import express, { response } from 'express'
import {create} from 'express-handlebars'
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

const handlebars = create({extname: '.hbs'})
app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

app.use("/", routes)

app.listen(port, () => logger.info(`Your app running on port ${port}!`))
