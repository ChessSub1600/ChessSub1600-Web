document.addEventListener('DOMContentLoaded', () => {
  const cookiesConsent = localStorage.getItem("cookies");
  const opcionesValidas = ["aceptadas", "esenciales", "rechazadas"];
  const banner = document.getElementById("aviso-cookies");

  if (!banner) return;

  // Limpiar si el valor es inválido
  if (!opcionesValidas.includes(cookiesConsent)) {
    localStorage.removeItem("cookies");
    banner.style.display = "block";
    return;
  }

  banner.style.display = "none";

  // Mostrar estado y ejecutar lógica de cookies
  const avisoEstado = document.createElement("p");
  avisoEstado.textContent = `Has aceptado: ${cookiesConsent}.`;
  avisoEstado.style.fontSize = "14px";
  avisoEstado.style.textAlign = "center";
  avisoEstado.style.marginTop = "10px";
  document.body.appendChild(avisoEstado);

  if (cookiesConsent === "aceptadas") {
    // scripts de terceros
  } else if (cookiesConsent === "esenciales") {
    // cookies técnicas
  } else if (cookiesConsent === "rechazadas") {
    // no cargar cookies externas
  }
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
