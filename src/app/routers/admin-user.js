const {createProfiles} = require('../controllers/User-controller')
const route = require('express').Router();


route.post('/create_profiles', createProfiles);


module.exports = route;