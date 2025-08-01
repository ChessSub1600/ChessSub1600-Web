const express = require('express');
const app = express();

// Estos dos middleware permiten que el servidor reciba datos correctamente
app.use(express.json()); // Para datos tipo JSON (como los de Postman)
app.use(express.urlencoded({ extended: true })); // Para datos de formulario HTML

const { guardarRegistroEnSheets } = require('./sheets'); // ajusta la ruta si hace falta

app.post('/formulario', async (req, res) => {
  console.log('📦 Datos recibidos en el backend:', req.body);

  try {
    await guardarRegistroEnSheets(req.body);
    res.send('✅ Registro guardado en Google Sheets con éxito!');
  } catch (error) {
    console.error('❌ Error al guardar en Sheets:', error);
    res.status(500).send('Hubo un problema al registrar el formulario.');
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
