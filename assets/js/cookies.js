document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById("aviso-cookies");
  const opcionesValidas = ["aceptadas", "esenciales", "rechazadas"];
  const estado = localStorage.getItem("cookies");

  if (!banner) return;

  if (!opcionesValidas.includes(estado)) {
    localStorage.removeItem("cookies");
    banner.style.display = "block";
    return;
  }

  banner.style.display = "none";

  const avisoEstado = document.createElement("p");
  avisoEstado.textContent = `Has aceptado: ${estado}.`;
  avisoEstado.style.cssText = "font-size:14px;text-align:center;margin-top:10px;";
  document.body.appendChild(avisoEstado);

  // Aquí puedes cargar scripts según el estado
});

function guardarConsentimiento(valor) {
  const opcionesValidas = ["aceptadas", "esenciales", "rechazadas"];
  const banner = document.getElementById("aviso-cookies");

  if (opcionesValidas.includes(valor)) {
    localStorage.setItem("cookies", valor);
    if (banner) banner.style.display = "none";
  } else {
    console.warn("Valor de consentimiento no válido:", valor);
    localStorage.removeItem("cookies");
    if (banner) banner.style.display = "block";
  }
}
