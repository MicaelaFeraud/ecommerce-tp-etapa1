
// js/auth.js - Manejo simple de login/registro/logout usando localStorage (NO seguro, solo práctica)
(function () {
  const KEY_USER = "tp_user";

  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY_USER) || "null"); }
    catch { return null; }
  }
  function setUser(u) { localStorage.setItem(KEY_USER, JSON.stringify(u)); }
  function clearUser() { localStorage.removeItem(KEY_USER); }

  function bindLogout() {
    const btn = document.getElementById("logoutBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        clearUser();
        location.href = "login.html";
      });
    }
  }

  function protect() {
    const shouldProtect = (document.body.getAttribute("data-protect") || "false") === "true";
    if (!shouldProtect) return;
    if (!getUser()) {
      location.href = "login.html";
    }
  }

  function bindLogin(formId) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "").trim();
      if (!email || !password) return alert("Completá email y contraseña");
      const current = getUser();
      if (current && current.email.toLowerCase() != email.toLowerCase()) {
        setUser({ name: current.name || "Usuario", email });
      } else if (!current) {
        setUser({ name: "Usuario", email });
      }
      location.href = "index.html";
    });
  }

  function bindRegister(formId) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "").trim();
      if (!name || !email || !password) return alert("Completá todos los campos");
      setUser({ name, email });
      location.href = "index.html";
    });
  }

  window.Auth = { bindLogin, bindRegister };
  bindLogout();
  protect();
})();
