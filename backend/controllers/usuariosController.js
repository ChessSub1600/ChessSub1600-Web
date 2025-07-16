// controllers/usuariosController.js

const db = require('../db/conexion');

function obtenerUsuarios(req, res) {
  db.query(
    'SELECT * FROM usuarios ORDER BY fecha_registro DESC',
    (err, resultados) => {
      if (err) {
        console.error('❌ Error al obtener usuarios:', err.message);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
      }
      res.status(200).json(resultados);
    }
  );
}

module.exports = { obtenerUsuarios };
