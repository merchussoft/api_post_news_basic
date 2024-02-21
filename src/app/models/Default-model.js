const pgpool = require('../config/PgConnection-config');


exports.listarAllNoticias = async () =>{
    let sql = 'SELECT cod_news, title, description, content, CAST(ne.created_at AS TIMESTAMP) as created_at , ubicacion as url_img '
    sql += `FROM news ne `
    sql += `LEFT JOIN adjuntos ad ON ad.relacion = ne.cod_news `;
    sql += `order by created_at desc`;
    return await pgpool.pgResult(sql);
}


exports.obtenerImagen = async (cod_adjunto) =>{
    return await pgpool.obtieneDatos({
        "table": `adjuntos`,
        "campo": 'relacion',
        "valor": cod_adjunto
    })
}

exports.insertNews = async (data) =>{
    return await pgpool.insertTable(`news`, data, 'cod_news')
}

exports.detailPost = async (cod_adjunto) =>{
    let sql = 'SELECT cod_news, title, description, content, ne.created_at , ubicacion_ssl as url_img '
    sql += 'FROM news ne '
    sql += 'LEFT JOIN adjuntos ad ON ad.relacion = ne.cod_news ';
    sql += 'WHERE 1=1 AND ne.cod_news = $1';
    return await pgpool.pgResult(sql, [cod_adjunto])
}

exports.insertAdjuntos = async (data = {})  => {
    return await pgpool.insertTable(`adjuntos`, data);
}