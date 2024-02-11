const route = require('express').Router();
const dfci = require('../controllers/Default-controller');
const {upload} = require('../config/multer-config');

route.get('/', dfci.listarNoticias);
route.get('/pruebasavenews/:cod', dfci.obtenerImagen);
route.post('/savenews', upload.single('imagen'), dfci.insertNews);
route.get('/detailspost/:cod_post', dfci.detailPost);
route.post('/upload_to_minio', upload.single('file_minio'), dfci.uploadToMinio);



module.exports = route;