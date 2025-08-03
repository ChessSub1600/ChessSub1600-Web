// ✅ URL de tu Web App (sin proxy para POST)
const targetURL = "https://script.google.com/macros/s/AKfycbzZqRpkKRncEMMMS4JpSVNPWp6YxKnp4fUdNtwDlWZKVpW-qeiFaG9W8jQZylU8BhQ/exec";

// ✅ Proxy sólo para GET (mientras pruebas CORS)
const proxy     = "https://api.allorigins.win/raw?url=";
const scriptURL = proxy + encodeURIComponent(targetURL);

// Lanza la petición GET para obtener reseñas
function obtenerReseñas() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        renderReseñas(data.reseñas);
      } else {
        console.error("Error al obtener reseñas:", data);
      }
    })
    .catch(err => console.error("Fetch fallido:", err));
}

// Envia la reseña usando text/plain para evitar preflight
function enviarResena(nombre, mensaje) {
  console.log("Enviando reseña:", nombre, mensaje);
  fetch(targetURL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body:    JSON.stringify({ nombre, mensaje })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        console.log("Reseña enviada correctamente");
        obtenerReseñas(); // refresca
      } else {
        console.error("Error al enviar reseña:", data);
      }
    })
    .catch(err => console.error("POST fallido:", err));
}

// Captura el submit del formulario
document.addEventListener("DOMContentLoaded", () => {
  obtenerReseñas();

  const form = document.getElementById("form-reseña");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre  = form.nombre.value.trim();
    const mensaje = form.mensaje.value.trim();
    if (nombre && mensaje) {
      enviarResena(nombre, mensaje);
      form.reset();
    }
  });
});
