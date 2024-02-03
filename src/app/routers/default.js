const route = require('express').Router();

route.get('/', (req, res)=>{
    res.send('hola mundo');
})



module.exports = route;