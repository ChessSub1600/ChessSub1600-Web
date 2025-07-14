document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formRegistro');
  const checkbox = document.getElementById('acepto');
  const mensaje = document.getElementById('mensaje');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');

  form.addEventListener('submit', event => {
    mensaje.textContent = '';
    mensaje.style.color = '';
    mensaje.style.fontWeight = '';
    mensaje.style.fontSize = '';

    // Verificación de casilla de política
    if (!checkbox.checked) {
      event.preventDefault();
      mensaje.textContent = '⚠️ Debes aceptar la política de privacidad para continuar.';
      mensaje.style.color = '#c0392b';
      mensaje.style.fontWeight = 'bold';
      mensaje.style.fontSize = '1rem';
      return;
    }

    // Verificación de contraseñas
    if (password.value !== confirmPassword.value) {
      event.preventDefault();
      mensaje.textContent = '⚠️ Las contraseñas no coinciden. Por favor, revísalas.';
      mensaje.style.color = '#bb200fff';
      mensaje.style.fontWeight = 'bold';
      mensaje.style.fontSize = '1rem';
      return;
    }

    // Éxito
    mensaje.textContent = '✔️ Registro enviado correctamente. ¡Gracias por sumarte a ChessSub1600!';
    mensaje.style.color = '#27ae60';
    mensaje.style.fontWeight = 'bold';
    mensaje.style.fontSize = '1rem';

    setTimeout(() => {
      mensaje.textContent = '';
    }, 4000);
  });
});
