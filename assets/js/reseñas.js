// ✅ URL produccion 
const scriptURL = "https://script.google.com/macros/s/AKfycbyXT4twqB9rCAIJK9YlnyeY_UyldjtD8wIFDVYvppiHmVykoh1eAXExc79FquUnfkaI/exec";

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

// 📝 Envía la reseña con URLSearchParams
function enviarResena(nombre, respuesta) {
  const formData = new URLSearchParams();
  formData.append("tipo", "reseña");
  formData.append("nombre", nombre);
  formData.append("respuesta", respuesta);

  fetch(scriptURL, {
    method: "POST",
    body: formData
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

  //Funcion resenas
  function renderReseñas(reseñas) {
  const lista = document.getElementById("lista-reseñas");
  lista.innerHTML = ""; // limpia antes de renderizar

  reseñas.forEach(reseña => {
    const div = document.createElement("div");
    div.className = "reseña-item";
    div.innerHTML = `
      <p><strong>${reseña.nombre}</strong> dice:</p>
      <p>${reseña.respuesta}</p>
      <hr>
    `;
    lista.appendChild(div);
  });
}

});
