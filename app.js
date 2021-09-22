// 3rd Party imports
const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')

// Imports
const auth_routes = require('./routes/auth_routes')
const data_routes = require('./routes/data_routes')

//Express app
const app = express();
const PORT = process.env.PORT || 3000;

//MongoDB
const dbURI = 'mongodb+srv://Noex98:eaaa12345@cluster0.1nwex.mongodb.net/webApp?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.info('App kører på port: ' + PORT )))
    .catch(err => console.log(err));


// Parsers & dev tools
//app.use(morgan('dev'));                             // dev tool
app.use(cookieParser());                            // Parse cookies
app.use(express.urlencoded({ extended: true }));    // Parse url-encoded
app.use(express.json({ extended: true }));          // Parse JSON

// Endpoints
app.use(auth_routes)    // Authorization, authentication and new users
app.use(data_routes)    // Crud operations for primary data

// Static files
app.use('/', express.static(path.join(__dirname, 'frontend')));

// Always send index
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})