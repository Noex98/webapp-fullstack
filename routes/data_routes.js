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

// Get plans
data_routes.get('/api/plans', (req, res) => {
    User.findById(req.cookies.user_Id).exec()
    .then(result => {
        if (result){
            res.json(result.plans)
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
    User.findByIdAndUpdate({_id: req.cookies.user_Id}, 
        {plans: req.body.plans}, (err, result) => {
            if (err){
                res.json()
            }
    })
})

// Get history
data_routes.get('/api/history', (req, res) => {
    User.findById(req.cookies.user_Id).exec()
    .then(result => {
        if (result){
            res.json(result.history)
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

module.exports = data_routes