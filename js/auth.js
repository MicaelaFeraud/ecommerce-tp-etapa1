// js/auth.js
(function () {
  const KEY_USER = "tp_user";

  // =========================
  // Helpers de storage
  // =========================
  function getUser() {
    try {
      // 1) Prioridad: sessionStorage (consigna Etapa 5)
      const fromSession = sessionStorage.getItem(KEY_USER);
      if (fromSession) return JSON.parse(fromSession);

      // 2) Compatibilidad: si hubiera algo viejo en localStorage
      const fromLocal = localStorage.getItem(KEY_USER);
      if (fromLocal) return JSON.parse(fromLocal);

      return null;
    } catch (e) {
      console.error("[Auth] Error leyendo usuario", e);
      return null;
    }
  }

  function setUser(user) {
    try {
      const value = JSON.stringify(user || null);
      // Guardamos SIEMPRE en sessionStorage (consigna)
      sessionStorage.setItem(KEY_USER, value);
      // Y también en localStorage por compatibilidad (no es obligatorio, pero ayuda)
      localStorage.setItem(KEY_USER, value);
    } catch (e) {
      console.error("[Auth] Error guardando usuario", e);
    }
  }

  function clearUser() {
    try {
      sessionStorage.removeItem(KEY_USER);
      localStorage.removeItem(KEY_USER);
    } catch (e) {
      console.error("[Auth] Error limpiando usuario", e);
    }
  }

  // =========================
  // Helpers de rutas
  // =========================
  function isInPages() {
    return location.pathname.includes("/pages/");
  }

  function goLogin() {
    if (isInPages()) {
      location.href = "login.html";
    } else {
      location.href = "pages/login.html";
    }
  }

  function goHome() {
    if (isInPages()) {
      location.href = "../index.html";
    } else {
      location.href = "index.html";
    }
  }

  // =========================
  // Protección de páginas
  // =========================
  function protect() {
    const shouldProtect =
      (document.body.getAttribute("data-protect") || "false") === "true";
    if (!shouldProtect) return;

    if (!getUser()) {
      goLogin();
    }
  }

  // =========================
  // Bind de botones / forms
  // =========================
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

  function bindLogin(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "").trim();

      if (!email || !password) {
        alert("Completá email y contraseña");
        return;
      }

      const current = getUser();

      // Si ya había usuario, actualizo solo el email
      if (current) {
        const currentName = current.name || "Usuario";
        setUser({ name: currentName, email: email });
      } else {
        setUser({ name: "Usuario", email: email });
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

      if (!name || !email || !password) {
        alert("Completá todos los campos");
        return;
      }

      setUser({ name: name, email: email });
      goHome();
    });
  }

  function logout() {
    clearUser();
    goLogin();
  }

  function isLoggedIn() {
    return !!getUser();
  }

  // API pública
  window.Auth = {
    bindLogin,
    bindRegister,
    logout,
    isLoggedIn,
    protect,
    goLogin,
    bindLogout,
    goHome,
    getUser
  };

  // Inicialización automática
  bindLogout();
  protect();
})();
