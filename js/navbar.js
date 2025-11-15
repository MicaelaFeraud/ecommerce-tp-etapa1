// js/navbar.js
(function () {
  // Estructura de datos: títulos + slug de la página
  const NAV_ROUTES = [
    { slug: "", label: "Inicio" },
    { slug: "category-electronica.html", label: "Electrónica" },
    { slug: "category-accesorios.html", label: "Accesorios" },
    { slug: "category-hogar.html", label: "Hogar & Deco" }
  ];

  function isInPages() {
    return location.pathname.includes("/pages/");
  }

  function buildHref(slug) {
    // Home
    if (slug === "") {
      return isInPages() ? "../index.html" : "index.html";
    }
    // Otras páginas
    const base = isInPages() ? "" : "pages/";
    return base + slug;
  }

  function getLogoSrc() {
    return isInPages() ? "../assets/logo.svg" : "assets/logo.svg";
  }

  function renderNavbar() {
    const root = document.getElementById("navbar-root");
    if (!root) return;

    const header = document.createElement("header");
    header.className = "navbar";

    header.innerHTML = `
      <div class="container navbar-inner">
        <a href="${buildHref("")}" class="brand">
          <img src="${getLogoSrc()}" alt="Logo" width="28" height="28" />
          <strong>Mica Store</strong>
        </a>
        <nav class="nav">
          ${NAV_ROUTES.map(r => `
            <a href="${buildHref(r.slug)}">${r.label}</a>
          `).join("")}
          <button id="logoutBtn" class="btn link">Cerrar sesión</button>
        </nav>
      </div>
    `;

    root.innerHTML = "";
    root.appendChild(header);
    if (window.Auth && typeof window.Auth.bindLogout === "function") {
      window.Auth.bindLogout();
    }
  }

  document.addEventListener("DOMContentLoaded", renderNavbar);
})();
