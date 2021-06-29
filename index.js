require('./src/config/database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./src/routes/main'))


app.get('/', (req, res) => {
    res.send('mai eipiei');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});