const {Pool} = require('pg');
const {PgConfig, validarTipoDato} = require('./config');

const pool = new Pool(PgConfig());

pool.connect((err, client, release) => {
    if (err) throw err
    release();
})

async function pgResult(sql, data = []) {
    try {
        const {rows, err} = await pool.query(sql, data);
        return {code: 200, data: rows, message: ''};
        let data_result = {code: 200, data: rows, message: ''};
        if (err) data_result = {code: 406, data: {}, message: err.detail};
        return data_result;
    } catch (e) {
        console.log(e);
        return {code: 406, data: {}, message: e.detail}
    }
}


async function obtieneDatos(data) {
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('str_adicional' in data) ? data.str_adicional : '';
    let campo = ('campo' in data) ? validarTipoDato(data.campo) : 1;
    let valor = ('valor' in data) ? validarTipoDato(data.valor) : 1;
    let sql = `SELECT ${campos}
               FROM ${data.table}
               WHERE ${campo} = ${valor} ${adicional}`;
    return await pgResult(sql);
}

async function insertTable(table, data = {}, cod_table= '') {
    try {
        let campos = Object.keys(data).toString();
        let values_insert = [];
        for (let i = 0; i < Object.keys(data).length; i++) values_insert.push(`$${i + 1}`);
        let sql_insert = `INSERT INTO ${table}(${campos}) VALUES (${values_insert.toString()}) `;
        if (cod_table !== '') sql_insert += ` RETURNING ${cod_table}`;
        let result_insert = await pgResult(sql_insert, Object.values(data))
        console.log(result_insert);
        let error_data = {code: result_insert.code, 'data': result_insert.data[0]};
        if (result_insert.code === 406) error_data = result_insert;
        return error_data;
    } catch (e) {
        //return {code: result_insert.code, 'data': result_insert.data[0]}
    }
}


module.exports = {
    pgResult,
    obtieneDatos,
    insertTable
}