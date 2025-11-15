// js/cards.js
// Componente de cards de productos que toma los datos desde window.PRODUCTS[categoryKey]
(function () {
  function renderCategoryCards(containerId, categoryKey) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var all = window.PRODUCTS || {};
    var products = all[categoryKey] || [];
    if (!products.length) {
      container.innerHTML = "<p class='helper'>No hay productos para esta categoría.</p>";
      return;
    }

    container.innerHTML = "";

    products.forEach(function (product) {
      var card = document.createElement("div");
      card.className = "card";

      // Título
      var title = document.createElement("strong");
      title.textContent = product.title;
      card.appendChild(title);

      // Imagen
      var img = document.createElement("img");
      img.src = product.image;
      img.alt = product.title;
      img.className = "product-img";
      card.appendChild(img);

      // Descripción
      var desc = document.createElement("p");
      desc.className = "helper";
      desc.textContent = product.description;
      card.appendChild(desc);

      // Precio
      var price = document.createElement("p");
      price.className = "product-price";
      var value = Number(product.price || 0);
      price.textContent = "$ " + value.toLocaleString("es-AR");
      card.appendChild(price);

      // Controles de cantidad
      var qtyWrapper = document.createElement("div");
      qtyWrapper.className = "qty-wrapper";

      var minusBtn = document.createElement("button");
      minusBtn.type = "button";
      minusBtn.className = "qty-btn";
      minusBtn.textContent = "-";

      var qtyInput = document.createElement("input");
      qtyInput.type = "number";
      qtyInput.min = "0";
      qtyInput.value = "0";
      qtyInput.readOnly = true;
      qtyInput.className = "qty-input";

      var plusBtn = document.createElement("button");
      plusBtn.type = "button";
      plusBtn.className = "qty-btn";
      plusBtn.textContent = "+";

      minusBtn.addEventListener("click", function () {
        var current = parseInt(qtyInput.value, 10) || 0;
        if (current > 0) qtyInput.value = current - 1;
      });

      plusBtn.addEventListener("click", function () {
        var current = parseInt(qtyInput.value, 10) || 0;
        qtyInput.value = current + 1;
      });

      qtyWrapper.appendChild(minusBtn);
      qtyWrapper.appendChild(qtyInput);
      qtyWrapper.appendChild(plusBtn);
      card.appendChild(qtyWrapper);

      // Botón "Ver más" (opcional)
      var link = document.createElement("a");
      link.className = "btn link";
      link.textContent = "Ver más";
      link.href = "#";
      card.appendChild(link);

      container.appendChild(card);
    });
  }

  window.Cards = { renderCategory: renderCategoryCards };
})();
