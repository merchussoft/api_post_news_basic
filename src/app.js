const express = require('express');
const app = express();
const mg = require('morgan');
const cors = require('cors');
const {createPathEnv, nodeEnv, getNumberEnv} = require('./app/config/config');

require('dotenv').config({
    path: createPathEnv(nodeEnv())
})



app.set('port', getNumberEnv('PORT_APP'));


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mg(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());


// import routers
app.use('/api/news', require('./app/routers/default'));
app.use('/api/users', require('./app/routers/admin-user'));

module.exports = app;