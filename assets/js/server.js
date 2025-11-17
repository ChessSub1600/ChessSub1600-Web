const express = require('express');
const cors = require('cors'); // ← nuevo import

const app = express();

app.use(cors()); // ← habilita CORS para todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { guardarRegistroEnSheets } = require('./sheets');
const { enviarCorreo } = require('./mailer');

app.post('/formulario', async (req, res) => {
  console.log('📦 Datos recibidos en el backend:', req.body);

  try {
    await guardarRegistroEnSheets(req.body);

    //Mensaje de bienvenida que se envia al usuario que wse registra!!
    await enviarCorreo(
  req.body.email,
  '¡Bienvenido a ChessSub1600! ♛',
  `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 1000px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <img src="https://ChessSub1600.github.io/ChessSub1600-Web/assets/img/caballo-negro.png" alt="ChessSub1600 Banner" style="width: 100%; height: auto;">
    <div style="padding: 20px;">
      <h2 style="color: #16325c;">¡Bienvenido a ChessSub1600, ${req.body.nombre}! &#x2654;</h2>
      <p>Gracias por registrarte en nuestra comunidad de ajedrez. Estamos encantados de tenerte con nosotros.</p>
      <p>Desde hoy recibirás contenido exclusivo para mejorar tu nivel, especialmente en el área de <strong>${req.body.interes}</strong>.</p>
      <hr style="margin: 20px 0;">
      <h3 style="color: #16325c;">📌 Información útil</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li>🌐 Sitio web: <a href="https://ChessSub1600.github.io/ChessSub1600-Web" style="color: #0077cc;">ChessSub1600.github.io/ChessSub1600-Web</a></li>
        <li>📱WhatsApp: <a href="https://wa.me/34641194252" style="color: #0077cc;">+34 641 194 252</a></li>
        <li>📸 Instagram: <a href="https://instagram.com/chesssub1600" style="color: #0077cc;">@chesssub1600</a></li>
        <li>📥 Email: <a href="mailto:soporteinfo29@gmail.com" style="color: #0077cc;">soporteinfo29@gmail.com</a></li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://teams.microsoft.com/l/meetup-join/URL-DE-TU-CITA" style="background-color: #0078d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Solicitar cita por Teams</a>
      </div>
      <p style="font-size: 0.9em; color: #666;">Si tienes alguna duda, no dudes en contactarnos. Estamos aquí para ayudarte a mejorar tu juego.</p>
    </div>
    <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 0.8em; color: #999;">
      © 2025 ChessSub1600 · <a href="https://ChessSub1600.github.io/ChessSub1600-Web/politica-privacidad.html" style="color: #999;">Política de privacidad</a>
    </div>
  </div>
  `
);

    res.json({
      status: 'OK',
      message: 'Registro guardado y correo enviado con éxito!'
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Hubo un problema al registrar el formulario.'
    });
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
