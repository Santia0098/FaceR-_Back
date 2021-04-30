require('./src/config/server');
require('./src/config/database');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(require('./src/routes/main'));


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});