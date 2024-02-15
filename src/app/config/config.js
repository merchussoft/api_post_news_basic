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

function PgConfig(){
    return {
        host: getEnvironment('DB_HOST_POSTGRES'),
        user: getEnvironment('DB_USER_POSTGRES'),
        password: getEnvironment('DB_PASS_POSTGRES'),
        database: getEnvironment('DB_NAME_POSTGRES'),
        port: getNumberEnv('DB_PORT_POSTGRES'),
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
    validarTipoDato,
    PgConfig
}

