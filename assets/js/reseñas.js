document.getElementById("form-reseña").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = this.nombre.value.trim();
  const mensaje = this.mensaje.value.trim();

  if (nombre && mensaje) {
    const reseña = document.createElement("div");
    reseña.innerHTML = `<strong>${nombre}:</strong> <p>${mensaje}</p><hr>`;
    document.getElementById("lista-reseñas").prepend(reseña);

    this.reset(); // limpiar formulario
  }
});
