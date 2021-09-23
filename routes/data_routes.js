const express = require('express')
const data_routes = express.Router()
const User = require('../models/user')

// Get all data
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
        res.json({
            auth: false
        })
    })
})

// Update plans
data_routes.put('/api/plans', (req, res) => {
    User.findByIdAndUpdate(req.cookies.user_Id, 
        {plans: req.body}, (err, result) => {
            if (err){
                res.json({err: 'Unidentified error'})
            }else {
                res.json(result.plans)
            }
    })
})

// Update user
data_routes.put('/api/user', (req, res) => {
    User.findByIdAndUpdate(req.cookies.user_Id, 
        {[req.body.key]: req.body.value}, (err, result) => {
            if (err){
                res.json({err: 'Unidentified error'})
            }else {
                res.json(result.plans)
            }
    })
})


module.exports = data_routes