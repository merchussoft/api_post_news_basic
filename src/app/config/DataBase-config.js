const mysql = require('mysql');
const {MysqlConfig, validarTipoDato} = require('./config');


const conn = mysql.createConnection(MysqlConfig());
conn.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos');
});


function resultPromise(sql, data = []) {
    return new Promise((resolve, reject) => {
        // Configurar el idioma de la sesión
        conn.query('SET lc_time_names = "es_ES"', (err) => {
            if (err) {
                console.error('Error al configurar el idioma de la sesión:', err);
                return;
            }
        })
        const data_mysql = conn.query(sql, data, (err, rows) => {
            try {
                let data_result = {code: 200, data: rows, message: ''};
                if (err) data_result = {code: 406, data: {}, message: err.sqlMessage, 'sql': err.sql};
                resolve(data_result)
            } catch (e) {
                console.log('mirando esto ==> ', err)
                reject(err);
            }
        })
    })
}

async function obtieneDatos(data) {
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('str_adicional' in data) ? data.str_adicional : '';
    let campo = ('campo' in data) ? validarTipoDato(data.campo) : 1;
    let valor = ('valor' in data) ? validarTipoDato(data.valor) : 1;
    let sql = `SELECT ${campos}
               FROM ${data.table}
               WHERE ${campo} = ${valor} ${adicional}`;
    return await resultPromise(sql);
}


module.exports = {
    resultPromise,
    obtieneDatos
}