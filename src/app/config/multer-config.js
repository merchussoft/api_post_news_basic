const multer = require('multer');

const storage = multer.memoryStorage();

exports.upload = multer({ dest: './uploads/' });