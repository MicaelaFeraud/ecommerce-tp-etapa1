// js/auth.js
(function () {
  const KEY_USER = "tp_user";

  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY_USER) || "null"); }
    catch { return null; }
  }
  function setUser(u) { localStorage.setItem(KEY_USER, JSON.stringify(u)); }
  function clearUser() { localStorage.removeItem(KEY_USER); }

  function isInPages() {
    return location.pathname.includes("/pages/");
  }

  // A dónde está el login según desde dónde estamos
  function goLogin() {
    if (isInPages()) {
      location.href = "login.html";
    } else {
      location.href = "pages/login.html";
    }
  }

  // A dónde está el home según desde dónde estamos
  function goHome() {
    if (isInPages()) {
      location.href = "../index.html";
    } else {
      location.href = "index.html";
    }
  }

  function bindLogout() {
    const btn = document.getElementById("logoutBtn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        clearUser();
        goLogin();
      });
    }
  }

  function protect() {
    const shouldProtect = (document.body.getAttribute("data-protect") || "false") === "true";
    if (!shouldProtect) return;
    if (!getUser()) goLogin();
  }

  function bindLogin(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "").trim();
      if (!email || !password) return alert("Completá email y contraseña");

      const current = getUser();
      if (current && current.email?.toLowerCase() !== email.toLowerCase()) {
        setUser({ name: current.name || "Usuario", email });
      } else if (!current) {
        setUser({ name: "Usuario", email });
      }
      goHome();
    });
  }

  function bindRegister(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "").trim();
      if (!name || !email || !password) return alert("Completá todos los campos");
      setUser({ name, email });
      goHome();
    });
  }

  function logout() { clearUser(); goLogin(); }
  function isLoggedIn() { return !!getUser(); }

  window.Auth = { bindLogin, bindRegister, logout, isLoggedIn, protect, goLogin, bindLogout, goHome };

  bindLogout();
  protect();
})();
