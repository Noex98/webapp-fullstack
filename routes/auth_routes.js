// Authentication
const express = require('express');
const auth_routes = express.Router();
const User = require('../models/user')
const crypt = require('../utils/crypt.js')

// Login
auth_routes.post('/api/login', (req, res) => {

    User.findOne({
        $or: [
            { username: req.body.user, password: req.body.password },
            { email: req.body.user, password: req.body.password }
        ]
    }).exec()
        .then(result => {
            if (result){
                res.cookie('user_Id', result._id.toString(), {
                    sameSite: 'none',
                    path: '/',
                    secure: true
                });
                res.json({
                    login: true,
                })
            } else {
                res.json({
                    login: false,
                    err: 'Incorrect login'
                })
            }
        })
        .catch(err => {
            res.json({
                login: false,
                err: 'Unidentified error'
            })
            console.log(err)
        })
})

// Create new user
auth_routes.post('/api/loginupdate', (req, res) => {

    User.findOne({ 
        $or: [
            { username: req.body.username, password: req.body.password },
            { email: req.body.email, password: req.body.password }
        ]
    }).exec()
        .then(result => {
            if (result){
                res.send('Brugernavn eller email er optaget')
            } else {
                const user = new User(req.body)
                user.save()
                    .then(result => {
                        console.log('Succes')
                        res.send('ok')
                    })
                    .catch(err => {
                        console.log(err)
                        res.send('ik ok')
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Protect frontend paths
auth_routes.post('/api/auth', (req, res) => {
    //console.log(crypt('abc'))
    //console.log(req.cookies.user_Id)
    //console.log(crypt(req.cookies.user_Id))
    User.findById(req.cookies.user_Id).exec()
        .then(result => {
            if (result){
                res.json({
                    auth: true
                })
            } else {
                res.json({
                    auth: false
                })
            }
        })
        .catch(err => {
            res.json({
                auth: false
            })
        })
})

// Authenticate requests
auth_routes.all('/api/*', (req, res) => {
    User.findById(req.cookies.user_Id).exec()
        .then(result => {
            if (result){
                next()
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

auth_routes.put('/api/loginupdate', (req, res) => {
    console.log('password reset')
})

module.exports = auth_routes;