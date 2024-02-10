const dfmodel = require('../models/Default-model');
const cfg = require('../config/config');
const {minioSave} = require('../config/minio-serve');

exports.listarNoticias = async (req, res) => {
    res.json(await dfmodel.listarAllNoticias());
}

exports.obtenerImagen = async (req, res) => {
    const result = await dfmodel.obtenerImagen(Number(req.params.cod))
    if (result.data.length) {
        const image = result.data[0];
        res.writeHead(200, {
            'Content-Type': image.extencion,
            'Content-Length': image.tamano,
        });
        res.end(image.buffer);
    } else {
        res.status(404).send('Imagen no encontrada.');
    }
}

exports.insertNews = async (req, res) => {
    const {data, code} = await dfmodel.insertNews(req.body);
    if (code === 200) {
        const data_minio = await minioSave(req.file);

        if (data_minio.code === 200) {
            const data_insert = data_minio.data;
            data_insert.relacion = data;
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