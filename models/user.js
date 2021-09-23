const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    history: {
        type: Array
    },
    plans: {
        type: Array
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User