// services/generateToken.js

const fs       = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// 1️⃣ Carga de credenciales OAuth
const credentials = require('./credentials.json');
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// 2️⃣ Ámbitos de permisos
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly'
];

function getAccessToken() {
  // Generar URL de autorización forzando prompt para refresh_token
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt:      'consent',
    scope:       SCOPES
  });

  console.log('💥 Autoriza esta app visitando esta URL:\n', authUrl);

  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
  });

  rl.question('📥 Pega aquí el código de autorización: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('❌ Error al obtener token:', err);
        return;
      }
      oAuth2Client.setCredentials(token);
      fs.writeFileSync('token.json', JSON.stringify(token, null, 2));
      console.log('✅ Nuevo token guardado como token.json');
    });
  });
}

// Ejecutar el flujo de generación
getAccessToken();
