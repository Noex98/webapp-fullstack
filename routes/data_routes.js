const express = require('express')
const data_routes = express.Router()
const User = require('../models/user')

data_routes.get('/api/user', (req, res) => {
    User.findById(req.cookies.user_Id).exec()
    .then(result => {
        if (result){
            res.json(result)
        } else {
            res.json({
                auth: false
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = data_routes