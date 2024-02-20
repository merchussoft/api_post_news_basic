const {insertTable} = require('../config/PgConnection-config');
const pgpool = require("../config/PgConnection-config");

exports.insertProfile = async (data) =>{
    return await pgpool.insertTable(`profiles`, data, 'cod_profile')
}