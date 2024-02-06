const route = require('express').Router();
const dfci = require('../controllers/Default-controller')

route.get('/', dfci.listarNoticias);
route.get('/pruebasavenews/:cod', dfci.obtenerImagen);
route.post('/savenews', dfci.insertNews);



module.exports = route;