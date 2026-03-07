'use strict'

import express, { response } from 'express'

const app = express()
const port = 3000;

app.get('/', (request, response) => response.send('Welcome to the FerBromHata!'))
app.get('/dashboard', (request, response) => response.send(`FerBromHata App Dashboard`))
app.get('/error', (request, response) => response.status(404).end('Page not found!'))

app.listen(port, () => console.log(`Express app running on port ${port}!`))
