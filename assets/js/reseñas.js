const scriptURL = "https://script.google.com/macros/s/AKfycbytmGMM97sa1x9zsx2N-Np4TVTUeLrKVaSem24tTjZf3ZOdCNv5VtTsFmDN4M1xm9I/exec";

// Enviar reseña
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-reseña");
  const lista = document.getElementById("lista-reseñas");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !mensaje) return;

    fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams({
        nombre: nombre,
        mensaje: mensaje
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        alert("✅ ¡Gracias por tu reseña!");
        form.reset();
        mostrarReseña(nombre, mensaje);
      } else {
        alert("❌ Error al enviar la reseña.");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ No se pudo conectar con el servidor.");
    });
  });

  // Mostrar reseñas existentes (opcional)
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data.reseñas)) {
        data.reseñas.forEach(r => mostrarReseña(r.nombre, r.mensaje));
      }
    })
    .catch(err => console.error("Error al cargar reseñas:", err));

  function mostrarReseña(nombre, mensaje) {
    const div = document.createElement("div");
    div.className = "reseña";
    div.innerHTML = `<strong>${nombre}</strong>: ${mensaje}`;
    lista.prepend(div);
  }
});
