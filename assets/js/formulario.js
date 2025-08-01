document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formRegistro');
  const mensaje = document.getElementById('mensaje');

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    // ✍️ Capturar datos
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

    // 🔁 Validar coincidencia
    if (password !== confirmPassword) {
      mostrarMensaje('Las contraseñas no coinciden.', true);
      return;
    }

    // ✅ Todo correcto
    mostrarMensaje('¡Registro exitoso! Bienvenido a ChessSub1600 🎉', false);

    // Aquí puedes agregar tu lógica de envío, por ejemplo:
    // fetch('/ruta-backend', { method: 'POST', body: JSON.stringify({ ... }) })
    // ✅ Enviar datos al backend
const datos = {
  nombre: document.getElementById('nombre').value.trim(),
  apellido: document.getElementById('apellido').value.trim(),
  email: document.getElementById('email').value.trim(),
  password,
  telefono: document.getElementById('telefono').value.trim(),
  interes: document.getElementById('interes').value,
};

fetch('https://chesssub1600-web.onrender.com/formulario', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams(datos)
})
  .then(response => response.text())
  .then(data => {
    mostrarMensaje(data, false);
  })
  .catch(error => {
    mostrarMensaje('Error al enviar el formulario. Intenta más tarde.', true);
    console.error(error);
  });

  });

  function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    mensaje.style.color = esError ? '#d32f2f' : '#16325c';
  }
});
