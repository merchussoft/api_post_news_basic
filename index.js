const app = require('./src/app');



app.listen(app.get('port'), () => console.log(`****** Conexion Existosa por el puerto ${app.get('port')} ******`))