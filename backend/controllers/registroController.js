// controllers/registroController.js

const db = require('../db/conexion');

function registrarUsuario(req, res) {
  console.log('▶️  registrarUsuario:', req.body);

  const {
    nombre,
    apellido  = '',
    email,
    password  = '',
    telefono  = '',
    interes   = '',
    acepto    = false
  } = req.body;

  if (!nombre || !email || !password || !acepto) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.query(
    `INSERT INTO usuarios 
       (nombre, apellido, email, password, telefono, interes, acepto) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellido, email, password, telefono, interes, acepto],
    (err, result) => {
      if (err) {
        console.error('❌ Error al insertar en BD:', err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log('✅ Usuario insertado con ID:', result.insertId);
      // Envío de correo desactivado
      return res.status(200).json({ message: '✅ Usuario registrado correctamente' });
    }
  );
}

module.exports = { registrarUsuario };
