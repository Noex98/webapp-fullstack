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
            { username: req.body.username},
            { email: req.body.email}
        ]
    }).exec()
        .then(result => {
            if (result){
                res.json({
                    login: false,
                    err: 'Username or email is already in use'
                })
            } else {
                const user = new User(req.body)
                user.save()
                    .then(result => {
                        console.log('Succes')
                        res.json({login: true})
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            login:false,
                            err: 'Unidentified error'
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Protect frontend paths
auth_routes.post('/api/auth', (req, res) => {
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
auth_routes.all('/api/*', (req, res, next) => {
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