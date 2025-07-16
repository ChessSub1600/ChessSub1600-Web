document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/usuarios')
    .then(res => res.json())
    .then(usuarios => {
      const tbody = document.querySelector('#tablaUsuarios tbody');

      usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido || ''}</td>
          <td>${usuario.email}</td>
          <td>${usuario.telefono || ''}</td>
          <td>${usuario.interes}</td>
          <td>${new Date(usuario.fecha_registro).toLocaleDateString()}</td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch(err => {
      console.error('Error al cargar usuarios:', err);
    });
});
