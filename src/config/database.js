const mysql = require('mysql');

const getConnection = () => mysql.createConnection({
    host: 'mante.hosting.acm.org',
    user: 'mantehostingacm_miguel',
    password: 'mantehostingacm1234',
    database: 'mantehostingacm_frBackend'
});

module.exports = getConnection;