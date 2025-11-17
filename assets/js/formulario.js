
//Versoin produccion
document.addEventListener('DOMContentLoaded', () => {
  const formulario  = document.getElementById('formRegistro');
  const mensaje     = document.getElementById('mensaje');
  const loader      = document.getElementById('loader');
  const btnRegistro = document.querySelector('.botonformu');

  const scriptURL = "https://script.google.com/macros/s/AKfycbytmGMM97sa1x9zsx2N-Np4TVTUeLrKVaSem24tTjZf3ZOdCNv5VtTsFmDN4M1xm9I/exec";

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

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

    const payload = {
      tipo: "registro", // ← este campo es clave
      nombre: document.getElementById('nombre').value.trim(),
      apellidos: document.getElementById('apellidos').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: pwd,
      confirmarPassword: pwd2,
      telefono: document.getElementById('telefono').value.trim(),
      interes: document.getElementById('interes').value,
      acepta: ok ? "Sí" : "No",
      fecha: new Date().toLocaleString()
    };

    loader.style.display = 'block';
    btnRegistro.disabled = true;

    try {
      const formData = new URLSearchParams();
for (const key in payload) {
  formData.append(key, payload[key]);
}

const response = await fetch(scriptURL, {
  method: 'POST',
  body: formData
});


      loader.style.display = 'none';
      btnRegistro.disabled = false;

      const data = await response.json();
      console.log('📨 Respuesta del backend:', data);

      if (data.status === 'OK') {
        mostrarMensaje('¡Registro exitoso! Bienvenido a ChessSub1600 🎉');
        formulario.reset();
      } else {
        mostrarMensaje('Error: ' + data.message, true);
        console.error('Backend error:', data);
      }

    } catch (err) {
      btnRegistro.disabled = false;
      mostrarMensaje('Error al enviar el formulario. Intenta más tarde.', true);
      console.error('❌ Error en fetch:', err);
    }
  });

  function mostrarMensaje(texto, esError = false) {
    mensaje.textContent = texto;
    mensaje.style.color = esError ? '#d32f2f' : '#16325c';
  }
});

