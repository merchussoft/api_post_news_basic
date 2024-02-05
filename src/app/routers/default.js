const route = require('express').Router();
const dfci = require('../controllers/Default-controller')

route.get('/', dfci.listarNoticias);
route.get('/pruebasavenews/:cod', dfci.obtenerImagen);



module.exports = route;