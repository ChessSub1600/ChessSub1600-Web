document.addEventListener("DOMContentLoaded", () => {
  // 🍔 Elementos clave del menú y header
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const closeBtn = document.getElementById("closeMenu");
  const menuLinks = menu.querySelectorAll("a");
  const header = document.querySelector(".header");
  const main = document.querySelector("main");

  // 🧠 Ajustar el espacio debajo del header automáticamente
  const headerHeight = header.offsetHeight;
  main.style.paddingTop = `${headerHeight}px`;

  // ✅ Abrir menú hamburguesa
  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
  });

  // ❌ Cerrar menú con botón X
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  // 🔗 Cerrar menú al hacer clic en cualquier enlace
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  // 🧼 Cerrar menú al hacer clic fuera del menú
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("active");
    }
  });

  // 🔽 Efectos de scroll: ocultar header, transparencia y reaparición
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("header--hidden", "header-transparente");
      return;
    }

    if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
      header.classList.add("header--hidden");
    } else {
      header.classList.remove("header--hidden");
    }

    if (currentScroll > 50) {
      header.classList.add("header-transparente");
    } else {
      header.classList.remove("header-transparente");
    }

    lastScroll = currentScroll;
  });
});
