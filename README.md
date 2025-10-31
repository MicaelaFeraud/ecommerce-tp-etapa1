# TP – Aplicaciones Web (Etapa 1)

**Alumno/a:** Micaela Feraud

Este repo contiene la estructura base del e‑commerce (HTML + JS puro):

- `index.html` con **navbar**, título y enlaces a 3 categorías
- `category-*.html` (Electrónica, Accesorios, Hogar & Deco), cada una con el mismo navbar
- `login.html` y `register.html` como formularios con inputs y botón **submit**
- `js/auth.js` maneja login/registro/logout usando `localStorage` (solo con fines didácticos)
- `assets/logo.svg` ícono simple de la tienda

## Etapa 2 – Estilos e identidad

En esta segunda etapa se aplicaron **estilos e identidad visual** al e-commerce usando **CSS puro**.

### 🎨 Paleta de colores
Se definió una paleta personalizada mediante variables CSS:
- **Primario:** `#D97FAF` (rosa pastel)
- **Fondo:** `#f3c9db`
- **Texto:** `#222`
- **Detalles y bordes:** tonos neutros (`#e8e6ea`, `#6b7280`)
  
Esta paleta busca transmitir una estética **suave y moderna**, manteniendo buena legibilidad.

### 🧱 Componentes estilizados
- **Navbar:** se estructuró y estilizó con una barra superior fija y espaciado fluido.
- **Login y Registro:** formularios centrados, con inputs redondeados y botones destacados.
- **Cards de productos:** cada card tiene fondo blanco, sombra suave y botón de acción primario.
- **Layout general:** se usó `display: grid` para organizar las cards en las categorías.
- **Botones:** variantes con color primario y hover.

### 🖼️ Extras
- Se utilizaron **variables CSS** para facilitar ajustes de color y tema.
- Se añadió soporte para **iconos de Font Awesome**.
- El diseño es **responsivo**, adaptándose a distintos anchos de pantalla.

### 🚀 Cómo probar
1. Abrí el proyecto con **Live Server** (VS Code) o abrí `index.html` en tu navegador.
2. Navegá las páginas desde el **navbar** para ver la coherencia de estilos.
3. Podés modificar los colores base desde `assets/style.css` (bloque `:root`).

> ⚠️ Las imágenes o recursos multimedia deben optimizarse en formato **WebP** o **SVG** para mantener el rendimiento del sitio.


## Cómo probar

Podés abrir el proyecto de dos formas:

### ✅ **Opción recomendada (Live Server)**
1. Instalá la extensión **Live Server** en VS Code  
2. Abrí la carpeta del proyecto en VS Code  
3. Hacé **clic derecho** en `index.html` → **“Open with Live Server”**  
4. Se abrirá el navegador con el entorno funcionando y los enlaces navegables

> 💡 Ventaja: el Live Server permite navegación correcta entre páginas y **recarga automática** cuando guardás cambios.

### ✅ **Opción alternativa (abrir manualmente)**
Abrí `login.html` para iniciar sesión o `register.html` para crear una cuenta de prueba.  
Luego navegá a `index.html` y a las categorías desde el navbar. El botón **Logout** cierra la sesión.

> 📝 Nota: No hay backend; todo funciona con `localStorage`, solo con fines didácticos.
