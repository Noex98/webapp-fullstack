const express = require('express')
const data_routes = express.Router()

data_routes.get('/api/123', (req, res) => {
    console.log(123)
})

module.exports = data_routes