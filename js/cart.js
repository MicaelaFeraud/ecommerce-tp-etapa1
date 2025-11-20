// js/cart.js
// Manejo del carrito usando localStorage
(function () {
  var CART_KEY = "tp_cart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch (e) {
      console.error("[Cart] Error leyendo carrito", e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart || []));
    } catch (e) {
      console.error("[Cart] Error guardando carrito", e);
    }
  }

  function addItem(product, quantity) {
    if (!product || !quantity || quantity <= 0) return;

    var cart = getCart();

    // Buscamos por título + categoría para evitar duplicados
    var index = cart.findIndex(function (item) {
      return item.title === product.title && item.category === product.category;
    });

    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push({
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category || null,
        quantity: quantity
      });
    }

    saveCart(cart);
  }

  function removeItemByIndex(idx) {
    var cart = getCart();
    if (idx < 0 || idx >= cart.length) return;
    cart.splice(idx, 1);
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getTotal() {
    return getCart().reduce(function (sum, item) {
      var price = Number(item.price || 0);
      var qty = Number(item.quantity || 0);
      return sum + price * qty;
    }, 0);
  }

  window.Cart = {
    getCart: getCart,
    saveCart: saveCart,
    addItem: addItem,
    removeItemByIndex: removeItemByIndex,
    clearCart: clearCart,
    getTotal: getTotal
  };
})();
