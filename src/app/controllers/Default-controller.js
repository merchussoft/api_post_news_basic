const dfmodel = require('../models/Default-model');
const cfg = require('../config/config');

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