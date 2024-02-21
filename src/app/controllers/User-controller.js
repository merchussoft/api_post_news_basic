const {insertProfile} = require('../models/user-model');

exports.createProfiles = async (req, res) => {
    const {profile, active} = req.body;
    const {data, code} = await insertProfile({profile, active});
    if (code === 406) {
        res.json({code, message: 'El perfil ya existe.'})
    } else {
        res.json({code, message: 'Perfil guardado existosamente', "cod": data.cod_profile})
    }
}