/**
 * Copyright 2019 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

const appName = require('./../package').name
const http = require('http')
const express = require('express')
const log4js = require('log4js')
const localConfig = require('./config/local.json')
const path = require('path')
var cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnection = require('../database')

const logger = log4js.getLogger(appName)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/build')))

const server = http.createServer(app)

app.use(
  log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' })
)
const serviceManager = require('./services/service-manager')
require('./services/index')(app)
require('./routers/index')(app, server)

// Add your code here

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to snoopy services' })
})

//GET request to get all the groceries
app.get('/groceries', (req, res) => {
  dbConnection.query('SELECT * FROM grocerylist', (err, rows, field) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log(rows)
      res.send(rows)
    }
  })
})

//POST request to add new grocery into the list
app.post('addgroceries', (req, res) => {
  const { item, quantity } = req.body // create new veriables to store the req.body properties
  const query = `INSERT INTO grocerylist VALUES (item, quantity, amount)`
  dbConnection.query(query, [item, quantity, amount], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('Results from database:', results)
      res.sendStatus(201)
    }
  })
})

// DELETE request remove an item from the grocery list
app.delete('/api/groceries', (req, res) => {})

// PUT request to update an intem from the grocery list
app.put('/api/groceries', (req, res) => {})

const port = process.env.PORT || localConfig.port
server.listen(port, function() {
  logger.info(`Server listening on http://localhost:${port}`)
  console.log(`Server listening on http://localhost:${port}`)
})

app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'))
})

app.use(function(err, req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '500.html'))
})

module.exports = server
