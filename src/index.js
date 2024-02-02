const express = require('express');
const app = express();


app.set('port', process.env.PORT || 3000);


app.get('/', (req, res)=>{
    res.send('hola mundo');
})

app.listen(app.get('port'), () => console.log(`SERVER RUNNING IN PORT ${app.get('port')}`))