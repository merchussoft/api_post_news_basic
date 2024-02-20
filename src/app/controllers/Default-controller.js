const dfmodel = require('../models/Default-model');
const {minioSave} = require('../helpers/updateS3Minio');
const axios = require('axios');
const cfg = require('../config/config');

exports.listarNoticias = async (req, res) => {
    res.json(await dfmodel.listarAllNoticias());
}

exports.obtenerImagen = async (req, res) => {
    try {
        const result = await dfmodel.obtenerImagen(Number(req.params.cod))
        if (result.data.length) {
            const image = result.data[0];
            const response = await axios.get(image.ubicacion, {responseType: 'stream'});

            res.writeHead(200, {
                'Content-Type': image.extencion,
                'Content-Length': response.headers['content-length']
            });
            response.data.pipe(res);
        } else {
            res.status(404).send('Imagen no encontrada.');
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error.message);
        res.status(500).send('Error al obtener la imagen');
    }

}

exports.insertNews = async (req, res) => {
    const body_data = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        cod_seccion: 1
    }
    const {data, code} = await dfmodel.insertNews(body_data);
    if (code === 200) {
        const data_minio = await minioSave(req.file);
        if (data_minio.code === 200) {
            const data_insert = data_minio.data;
            data_insert.relacion = data.cod_news;
            data_insert.ubicacion_ssl = `${cfg.UrlHost(req)}/obtener_imagen/${data.cod_news}`;
            await dfmodel.insertAdjuntos(data_insert)
            res.status(data_minio.code).json({message: 'data guardada existosamente'});
        } else {
            res.status(code).json({message: 'data guardada existosamente sin una imagen'});
        }
    } else {
        res.status(code).json({message: 'Validar la data del formulario'});
    }
}


exports.detailPost = async (req, res) => {
    const {data, code} = await dfmodel.detailPost(Number(req.params.cod_post));
    res.status(code).json(data);
}


exports.uploadToMinio = async (req, res) => {
    const data_minio = await minioSave(req.file);
    res.status(data_minio.code).json(data_minio.data.ubicacion);
}