const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'soporteinfo29@gmail.com',
    pass: 'vdgogentwmatdeaa' // tu clave de aplicación
  },
  tls: {
    rejectUnauthorized: false // ← permite certificados autofirmados en local
  }
});

async function enviarCorreo(destinatario, asunto, mensajeHTML) {
  const mailOptions = {
    from: 'ChessSub1600 <soporteinfo29@gmail.com>',
    to: destinatario,
    subject: asunto,
    html: mensajeHTML
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreo };
