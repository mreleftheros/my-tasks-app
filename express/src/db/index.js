const mysql = require("mysql2");

const db = mysql.createConnection(process.env.DB_URI);

module.exports = db;
