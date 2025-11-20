// js/products.js
// Carga de productos desde JSON usando fetch
(function () {
  function isInPages() {
    return location.pathname.includes("/pages/");
  }

  function getDataUrl() {
    // Si estoy en /pages uso "../data/...", si no "data/..."
    return isInPages() ? "../data/products.json" : "data/products.json";
  }

  async function loadProducts() {
    // Si ya está en memoria, lo devuelvo
    if (window.PRODUCTS) {
      return window.PRODUCTS;
    }

    try {
      const res = await fetch(getDataUrl());
      if (!res.ok) {
        throw new Error("HTTP " + res.status);
      }
      const data = await res.json();
      window.PRODUCTS = data;
      return data;
    } catch (err) {
      console.error("[Products] Error cargando productos", err);
      window.PRODUCTS = window.PRODUCTS || {};
      return window.PRODUCTS;
    }
  }

  // API pública para el resto del sitio
  window.ProductsData = {
    loadProducts
  };
})();
