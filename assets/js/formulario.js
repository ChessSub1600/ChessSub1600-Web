// Ejecuta el código solo cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // 🎯 Referencias a los elementos del formulario
  const form = document.getElementById('formRegistro');           // El formulario principal
  const checkbox = document.getElementById('acepto');             // Casilla de aceptación legal
  const mensaje = document.getElementById('mensaje');             // Elemento para mostrar mensajes de estado
  const password = document.getElementById('password');           // Campo de contraseña
  const confirmPassword = document.getElementById('confirm-password'); // Campo de confirmación

  // 🚀 Cuando el usuario envía el formulario
  form.addEventListener('submit', event => {
    event.preventDefault(); // Evita que se recargue la página

    // 🔄 Limpieza del mensaje anterior
    mensaje.textContent = '';
    mensaje.style.color = '';
    mensaje.style.fontWeight = '';
    mensaje.style.fontSize = '';

    // ⚖️ Verifica si la casilla legal fue aceptada
    if (!checkbox.checked) {
      mensaje.textContent = '⚠️ Debes aceptar la política de privacidad para continuar.';
      mensaje.style.color = '#c0392b'; // Rojo
      mensaje.style.fontWeight = 'bold';
      mensaje.style.fontSize = '1rem';
      return; // Detiene el envío
    }

    // 🔐 Verificación de coincidencia entre contraseñas
    if (password.value !== confirmPassword.value) {
      mensaje.textContent = '⚠️ Las contraseñas no coinciden. Por favor, revísalas.';
      mensaje.style.color = '#bb200fff';
      mensaje.style.fontWeight = 'bold';
      mensaje.style.fontSize = '1rem';
      return; // Detiene el envío
    }

    // 📦 Recolección de los datos del formulario en un objeto
    const datos = {
      nombre: form.nombre.value.trim(),
      apellido: form.apellido.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),            // *Actualmente sin hash*
      telefono: form.telefono.value.trim() || '',
      interes: form.interes.value,
      acepto: checkbox.checked                         // Booleano: true si está marcado
    };

    // 🌐 Envío de los datos al back-end usando fetch()
    fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json()) // 🔁 Convierte la respuesta a JSON
    .then(data => {
      // 🎉 Muestra mensaje de éxito o personalizado desde el servidor
      mensaje.textContent = data.message || '✔️ Registro enviado correctamente.';
      mensaje.style.color = '#27ae60'; // Verde éxito
      mensaje.style.fontWeight = 'bold';
      mensaje.style.fontSize = '1rem';
      form.reset(); // Limpia el formulario
    })
    .catch(err => {
      // ❌ Muestra mensaje de error si el fetch falla
      console.error('Error al registrar:', err);
      mensaje.textContent = '❌ Hubo un error al enviar el formulario.';
      mensaje.style.color = '#c0392b';
    });

    // ⏳ Limpia el mensaje pasados 4 segundos
    setTimeout(() => {
      mensaje.textContent = '';
    }, 4000);
  });
});
