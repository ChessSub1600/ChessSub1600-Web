const { google } = require('googleapis');
const path = require('path');

console.log('Ruta calculada del JSON:', path.join(__dirname, '../../chesssub1600mailer.json'));

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../chesssub1600mailer.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const SPREADSHEET_ID = '1VjKsWc67xGpDPG6_XZzkSYmqteeBGcU2UwAHsPPJU6c';

// 📄 Guardar registro en hoja "Usuarios"
async function guardarRegistroEnSheets(datos) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const valores = [
    [
      datos.nombre,
      datos.apellidos,
      datos.email,
      datos.password,
      datos.confirmarPassword,
      datos.telefono ? `'${String(datos.telefono).trim()}'` : '',
      datos.interes,
      datos.acepta,
      datos.fecha || new Date().toLocaleString('es-ES')
    ]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Usuarios',
    valueInputOption: 'USER_ENTERED',
    resource: { values: valores }
  });
}

// 📝 Guardar reseña en hoja "reseñaUsuarios"
async function guardarReseñaEnSheets(datos) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const valores = [
    [
      datos.nombre,
      datos.respuesta,
      datos.fecha || new Date().toLocaleString('es-ES')
    ]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'reseñaUsuarios',
    valueInputOption: 'USER_ENTERED',
    resource: { values: valores }
  });
}

module.exports = {
  guardarRegistroEnSheets,
  guardarReseñaEnSheets
};
