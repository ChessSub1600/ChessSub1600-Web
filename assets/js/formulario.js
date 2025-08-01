// 🕒 Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formRegistro'); // Formulario principal
  const mensaje = document.getElementById('mensaje'); // Elemento para mostrar mensajes al usuario

  // 📌 URL del Web App de Google Apps Script (reemplaza con tu URL real)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyC6WDuWRWp6_zJnqUUBzoIJKLxl1oqzcxEMuYZKlFW6vdcaxZoyh_ymw1KjdVWNjw/exec';
//https://script.google.com/macros/s/AKfycbyC6WDuWRWp6_zJnqUUBzoIJKLxl1oqzcxEMuYZKlFW6vdcaxZoyh_ymw1KjdVWNjw/exec
  // 🧷 Escuchar el evento de envío del formulario
  formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    // ✍️ Capturar datos del formulario
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const checkbox = document.getElementById('acepto');

    // 🛡️ Validar casilla de consentimiento
    if (!checkbox.checked) {
      mostrarMensaje('Debes aceptar la política de privacidad.', true);
      return;
    }

    // 🔒 Validar seguridad de contraseña
    const esSeguro = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(password);
    if (!esSeguro) {
      mostrarMensaje('La contraseña debe tener al menos 5 caracteres, una mayúscula, un número y un símbolo (@, $, etc).', true);
      return;
    }

    // 🔁 Validar coincidencia de contraseñas
    if (password !== confirmPassword) {
      mostrarMensaje('Las contraseñas no coinciden.', true);
      return;
    }

    // 📦 Preparar datos para enviar
    const datos = new FormData(formulario);

    // 🚀 Enviar datos al Web App de Google Apps Script
    fetch(scriptURL, {
      method: 'POST',
      body: datos
    })
      .then(response => {
        if (response.ok) {
          mostrarMensaje('¡Registro exitoso! Bienvenido a ChessSub1600 🎉', false);
          formulario.reset(); // Limpiar el formulario
        } else {
          throw new Error('Respuesta no válida del servidor');
        }
      })
      .catch(error => {
        mostrarMensaje('Error al enviar el formulario. Intenta más tarde.', true);
        console.error('Error:', error);
      });
  });

  // 💬 Función para mostrar mensajes al usuario
  function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    mensaje.style.color = esError ? '#d32f2f' : '#16325c';
  }
});
