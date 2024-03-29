const db = require('../config/DataBase-config');
const cfg = require ('../config/config');


exports.listarAllNoticias = async () =>{
    let sql = 'SELECT cod_news, title, description, content, DATE_FORMAT(ne.created_at, "%e %M, %Y") as created_at , ubicacion as url_img '
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

exports.insertNews = async (data) =>{
    return await db.insertTable(`${cfg.getEnvironment('DB_CLIENT')}.news`, data)
}

exports.detailPost = async (cod_adjunto) =>{
    let sql = 'SELECT cod_news, title, description, content, DATE_FORMAT(ne.created_at, "%e %M, %Y") as created_at , ubicacion as url_img '
    sql += `FROM ${cfg.getEnvironment('DB_CLIENT')}.news ne `
    sql += `LEFT JOIN ${cfg.getEnvironment('DB_CLIENT')}.adjuntos ad ON ad.relacion = ne.cod_news `;
    sql += `WHERE 1=1 AND ne.cod_news = ?`;
    return await db.resultPromise(sql, [cod_adjunto])
}

exports.insertAdjuntos = async (data = {})  => {
    return await db.insertTable(`${cfg.getEnvironment('DB_CLIENT')}.adjuntos`, data)
}