// ✅ URL local para pruebas
const scriptURL = "https://script.google.com/macros/s/AKfycbxYoDxxEkz9Jz2oPh4-W5c8KhpP3RleFu751v76TNiuEiDHkrgHb6eXaSHV7WaeuN0/exec";

// 🧩 Lanza la petición GET para obtener reseñas (si tienes esa ruta en el backend)
function obtenerReseñas() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK" && Array.isArray(data.reseñas)) {
        renderReseñas(data.reseñas); // ← asegúrate de tener esta función en tu HTML
      } else {
        console.error("Error al obtener reseñas:", data);
      }
    })
    .catch(err => console.error("❌ Error en fetch GET:", err));
}

// 📝 Envía la reseña como JSON
function enviarResena(nombre, respuesta) {
  console.log("📤 Enviando reseña:", nombre, respuesta);
  fetch(scriptURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "reseña",
      nombre,
      respuesta,
      fecha: new Date().toLocaleString()
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        console.log("✅ Reseña enviada correctamente");
        obtenerReseñas(); // refresca
      } else {
        console.error("Error al enviar reseña:", data);
      }
    })
    .catch(err => console.error("❌ Error en fetch POST:", err));
}

// 🧩 Captura el submit del formulario
document.addEventListener("DOMContentLoaded", () => {
  obtenerReseñas();

  const form = document.getElementById("form-reseña");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre    = form.nombre.value.trim();
    const respuesta = form.mensaje.value.trim();
    if (nombre && respuesta) {
      enviarResena(nombre, respuesta);
      form.reset();
    }
  });
});
