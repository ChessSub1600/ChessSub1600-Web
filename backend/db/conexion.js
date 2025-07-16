// db/conexion.js

const mysql = require('mysql2');
const db    = mysql.createConnection({
  host:     'localhost',
  user:     'root',
  password: '123456',
  database: 'chesssub1600'
});

db.connect(err => {
  if (err) throw err;
  console.log('📦 Conexión a MySQL establecida');
});

module.exports = db;
