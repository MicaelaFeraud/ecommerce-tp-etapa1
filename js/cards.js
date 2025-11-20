// js/cards.js
// Componente de cards de productos que toma los datos desde ProductsData/loadProducts
(function () {
  function renderCategoryCards(containerId, categoryKey, options) {
    var container = document.getElementById(containerId);
    if (!container) return;

    options = options || {};
    var limit = options.limit || null;

    container.innerHTML = "<p class='helper'>Cargando productos...</p>";

    var loader;
    if (window.ProductsData && typeof window.ProductsData.loadProducts === "function") {
      loader = window.ProductsData.loadProducts();
    } else {
      loader = Promise.resolve(window.PRODUCTS || {});
    }

    loader
      .then(function (all) {
        var products = all[categoryKey] || [];
        if (limit && products.length > limit) {
          products = products.slice(0, limit);
        }

        if (!products.length) {
          container.innerHTML =
            "<p class='helper'>No hay productos para esta categoría.</p>";
          return;
        }

        container.innerHTML = "";

        products.forEach(function (product, index) {
          var card = document.createElement("article");
          card.className = "card";

          // Imagen
          var img = document.createElement("img");
          img.src = product.image;
          img.alt = product.title;
          img.loading = "lazy";
          card.appendChild(img);

          // Título
          var title = document.createElement("h3");
          title.textContent = product.title;
          card.appendChild(title);

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

          // ⬇️ Nuevo contenedor horizontal: precio + cantidad
          var priceQty = document.createElement("div");
          priceQty.className = "price-qty-row";
          priceQty.appendChild(price);
          priceQty.appendChild(qtyWrapper);

          card.appendChild(priceQty);

          // Botón "Añadir al carrito"
          var addBtn = document.createElement("button");
          addBtn.type = "button";
          addBtn.className = "btn ";
          addBtn.innerHTML = `<i class="fa-solid fa-cart-plus cart-icon"></i> Añadir al carrito`;


          addBtn.addEventListener("click", function () {
            var quantity = parseInt(qtyInput.value, 10) || 0;
            if (quantity <= 0) {
              alert("Seleccioná una cantidad mayor a 0 😊");
              return;
            }

            var itemData = {
              title: product.title,
              price: product.price,
              image: product.image,
              description: product.description,
              category: categoryKey
            };

            if (window.Cart && typeof window.Cart.addItem === "function") {
              window.Cart.addItem(itemData, quantity);
              alert("Producto añadido al carrito ✔");
            } else {
              alert("No se pudo añadir al carrito (Cart no disponible).");
            }
          });

          card.appendChild(addBtn);

          // Botón "Ver más"
          var link = document.createElement("a");
          link.className = "btn link";
          link.textContent = "Ver más";
          link.href = "#";
          card.appendChild(link);

          container.appendChild(card);
        });
      })
      .catch(function (err) {
        console.error("[Cards] Error renderizando categoría", err);
        container.innerHTML =
          "<p class='helper'>No se pudieron cargar los productos.</p>";
      });
  }

  window.Cards = { renderCategory: renderCategoryCards };
})();
