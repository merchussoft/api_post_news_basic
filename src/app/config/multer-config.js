const multer = require('multer');

const storage = multer.memoryStorage();

//exports.upload = multer({ dest: './uploads/' });
exports.upload = multer({ storage: storage });