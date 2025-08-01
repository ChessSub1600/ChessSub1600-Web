const { google } = require('googleapis');
const path = require('path');

// ✅ Mostrar la ruta calculada del JSON para verificar
console.log('Ruta calculada del JSON:', path.join(__dirname, '../../chesssub1600mailer.json'));

// Autenticación con Google Sheets usando tu clave .json
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../chesssub1600mailer.json'), // Correcta: sube 2 niveles desde assets/js
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// 📄 Función para guardar un registro en la hoja
async function guardarRegistroEnSheets(datos) {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    /*Campos que recibeel backend del formulario bbdd */
    const valores = [
        [
            datos.nombre,
            datos.apellido,
            datos.email,
            datos.telefono ? `'${String(datos.telefono).trim()}'` : '',
            datos.interes,
            datos.password,
            datos.confirmarPassword,
            new Date().toLocaleString('es-ES')
        ]
    ];


    await sheets.spreadsheets.values.append({
        spreadsheetId: '14duvYmnsoARzgk-OdzRd_4IUQp2UX5JKL51tbVqHFjQ',
        range: 'Hoja1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: valores }
    });
}

module.exports = { guardarRegistroEnSheets };
