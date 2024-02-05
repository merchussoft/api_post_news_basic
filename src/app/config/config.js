function getEnvironment(k) {
    return process.env[k];
}

function getNumberEnv(k){
    return Number(getEnvironment(k))
}

function nodeEnv() {
    return getEnvironment('NODE_ENV')?.trim() || "";
}

function createPathEnv(path){
    const arr_env = ['env'];
    if (path.length) {
        const stringToArray = path.split('.');
        arr_env.unshift(...stringToArray);
    }
    return '.' + arr_env.join('.');
}

function MysqlConfig(){
    return {
        host: getEnvironment('DB_HOST'),
        user: getEnvironment('DB_USER'),
        password: getEnvironment('DB_PASS'),
        database: getEnvironment('DB_NAME'),
        port: getNumberEnv('DB_PORT'),
        timezone: 'Europe/Madrid',
        charset: 'utf8mb4'
    }
}


function validarTipoDato(valor) {
    return (typeof valor === 'number') ? Number(valor) : valor;
}


module.exports = {
    getEnvironment,
    getNumberEnv,
    nodeEnv,
    createPathEnv,
    MysqlConfig,
    validarTipoDato
}

