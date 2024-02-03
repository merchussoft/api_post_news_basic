const route = require('express').Router();

route.get('/', (req, res)=>{
    res.json({
        message: 'hola mundo que mas'
    });
})



module.exports = route;