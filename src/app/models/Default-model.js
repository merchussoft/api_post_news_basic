const db = require('../config/DataBase-config');
const cfg = require ('../config/config');


exports.listarAllNoticias = async () =>{
    let sql = 'SELECT cod_news, title, description, content, ne.created_at, ubicacion as url_img '
    sql += `FROM ${cfg.getEnvironment('DB_CLIENT')}.news ne `
    sql += `LEFT JOIN ${cfg.getEnvironment('DB_CLIENT')}.adjuntos ad ON ad.relacion = ne.cod_news`;
    return await db.resultPromise(sql)
}


exports.obtenerImagen = async (cod_adjunto) =>{
    return await db.obtieneDatos({
        "table": `${cfg.getEnvironment('DB_CLIENT')}.adjuntos`,
        "campo": 'relacion',
        "valor": cod_adjunto
    })
}