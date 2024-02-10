const Minio = require('minio');
const cfg = require('./config');
const fs = require('fs');


exports.minioSave = async (file) => {
    console.log(file)
    if (file) {
        try {
            const minioClient = new Minio.Client({
                endPoint: cfg.getEnvironment('ENDPOINT'),
                port: 9000, // Puerto predeterminado de Minio
                useSSL: false, // Cambia a true si estás usando SSL
                accessKey: cfg.getEnvironment('USER_MINIO'), //'tu-usuario'
                secretKey: cfg.getEnvironment('SECRET_KEY'), // 'tu-password'
            });

            const metaData = {
                'Content-Type': file.mimetype,
                'X-Amz-Meta-Testing': 1234,
            };

            const {
                etag,
                err
            } = await minioClient.fPutObject(cfg.getEnvironment('BUCKET_MINIO'), file.originalname, file.path, metaData);
            fs.unlinkSync(file.path);
            return err ? {code: 403, data: {}} : {
                code: 200,
                data: {
                    'nombre': file.originalname,
                    'extencion': file.mimetype,
                    'tamano': file.size,
                    "descripcion": file.originalname,
                    'ubicacion': `http://${cfg.getEnvironment('ENDPOINT')}:9000/${cfg.getEnvironment('BUCKET_MINIO')}/${file.originalname}`
                }
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        return {code: 403, data: {}}
    }

}