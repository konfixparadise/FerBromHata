'use strict'

import express, { response } from 'express'
import {create} from 'express-handlebars'
import routes from './routes.js'
import logger from './utils/logger.js'

const app = express()
const port = 3000;

const handlebars = create({extname: '.hbs'})
app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

app.use("/", routes)

app.listen(port, () => logger.info(`Your app running on port ${port}!`))
