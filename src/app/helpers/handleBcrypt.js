const bcrypt = require('bcryptjs');

const encrypt = async (dataEncripter) =>{
    return await bcrypt.has(dataEncripter, 10);
}

const compare = async (password, hash_password) =>{
    return await bcrypt.compare(password, hash_password);
}

module.exports = {
    encrypt,
    compare
}