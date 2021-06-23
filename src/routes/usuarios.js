const express = require('express');
const getConnection = require('../config/database');
const router = express.Router();



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
        pass,
        tipo_sistema
    } = request.body;

    const sql = `INSERT INTO usuarios(nombre, ap_paterno, ap_materno, correo, pass, tipo_sistema) VALUES (?,?,?,?,?,?)`;

    const values = [ nombre, ap_paterno, ap_materno, correo, pass, tipo_sistema];

    connection.query(sql, values, ( error, result ) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: 'Usuario registrado' });
    });
    connection.end();
});

module.exports = router;