const app = require('./src/app');



app.listen(app.get('port'), () => console.log(`SERVER RUNNING IN PORT ${app.get('port')}`))