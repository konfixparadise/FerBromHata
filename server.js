'use strict'

import express, { response } from 'express'
import routes from './routes.js'

const app = express()
const port = 3000;

app.use("/", routes)

app.listen(port, () => console.log(`Express app running on port ${port}!`))
