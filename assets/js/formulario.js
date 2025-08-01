document.addEventListener('DOMContentLoaded', () => {
  const formulario  = document.getElementById('formRegistro');
  const mensaje     = document.getElementById('mensaje');
  const loader      = document.getElementById('loader');
  const btnRegistro = document.querySelector('.botonformu');

  // URL de tu Web App desplegado
  const scriptURL = 'https://script.google.com/macros/s/AKfycbytmGMM97sa1x9zsx2N-Np4TVTUeLrKVaSem24tTjZf3ZOdCNv5VtTsFmDN4M1xm9I/exec';

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // — Validaciones —
    const pwd  = document.getElementById('password').value.trim();
    const pwd2 = document.getElementById('confirmarPassword').value.trim();
    const ok   = document.getElementById('acepto').checked;

    if (!ok) {
      return mostrarMensaje('Debes aceptar la política de privacidad.', true);
    }

    const esSeguro = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(pwd);
    if (!esSeguro) {
      return mostrarMensaje(
        'La contraseña debe tener al menos 5 caracteres, una mayúscula, un número y un símbolo (@, $, etc).',
        true
      );
    }

    if (pwd !== pwd2) {
      return mostrarMensaje('Las contraseñas no coinciden.', true);
    }

    // — Construir payload x-www-form-urlencoded —
    const form = new FormData(formulario);
    const params = new URLSearchParams();
    form.forEach((value, key) => params.append(key, value));

    // UI: mostrar loader + desactivar botón
    loader.style.display      = 'block';
    btnRegistro.disabled      = true;

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params.toString()
      });

      loader.style.display = 'none';
      btnRegistro.disabled = false;

      // Esperamos JSON de vuelta
      const data = await response.json();

      if (data.status === 'OK') {
        mostrarMensaje('¡Registro exitoso! Bienvenido a ChessSub1600 🎉');
        formulario.reset();
      } else {
        mostrarMensaje('Error: ' + data.message, true);
        console.error('Backend error:', data);
      }

    } catch (err) {
      loader.style.display = 'none';
      btnRegistro.disabled = false;
      mostrarMensaje('Error al enviar el formulario. Intenta más tarde.', true);
      console.error('Fetch error:', err);
    }
  });

  function mostrarMensaje(texto, esError = false) {
    mensaje.textContent   = texto;
    mensaje.style.color   = esError ? '#d32f2f' : '#16325c';
  }
});
