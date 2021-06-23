require('./src/config/database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('./src/routes/main'))

app.get('/', (req, res) => {
    res.send('mai eipiei');
});

router.post('/login', (request, response) => {
    connection = getConnection();
    connection.connect( error => { 
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "Internal server error" });
        }
    });

    const {
        correo, 
        pass
    } = request.body;

    console.log(correo);
    console.log(pass);

    const sql = `SELECT *  FROM usuarios
    WHERE correo = ? AND pass = ?`;

    const values = [ correo, pass ];

    connection.query(sql, values, ( error, result ) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        if (result.length > 0) {
            response.status(200).json({ error: false, status: 200, message: result[0] });
        } else {
            response.status(200).json({ error: true, status: 500, message: 'No result' });
        }
    });
    connection.end();
});



router.post('/registro', (request, response) => {
    connection = getConnection();
    connection.connect( error => { 
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "Internal server error" });
        }
    });

    const {
        nombre, 
        ap_paterno,
        ap_materno,
        correo,
        pass
    } = request.body;

    const sql = `INSERT INTO usuarios(nombre, ap_paterno, ap_materno, correo, pass) VALUES (?,?,?,?,?)`;

    const values = [ nombre, ap_paterno, ap_materno, correo, pass];

    connection.query(sql, values, ( error, result ) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: 'Usuario registrado' });
    });
    connection.end();
});

process.env.PORT = process.env.PORT || 3005;


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});