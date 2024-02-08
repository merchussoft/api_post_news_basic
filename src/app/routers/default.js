const route = require('express').Router();
const dfci = require('../controllers/Default-controller')

route.get('/', dfci.listarNoticias);
route.get('/pruebasavenews/:cod', dfci.obtenerImagen);
route.post('/savenews', dfci.insertNews);
route.get('/detailspost/:cod_post', dfci.detailPost);



module.exports = route;