# ☕ Café Santander — FASE I

![React](https://img.shields.io/badge/React-19.1+-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020+-yellow)
![Vite](https://img.shields.io/badge/Vite-7.2+-646CFF)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-brightgreen)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)




---
## **Proyecto: Café Santander — FASE I**

Este repositorio contiene la aplicación web desarrollada en React + JavaScript moderno con Vite para la entrega de la FASE‑I del proyecto.

##  **Portada**

- Nombre del aplicativo: **Café Santander**

**02_CafeSantander — FASE I**

**Aplicación web: Café Santander**

Esta es la entrega de la FASE‑I del proyecto de grupo (Grupo 2). El repositorio contiene la aplicación front‑end desarrollada en React + JavaScript con Vite, la documentación de uso y las instrucciones para empaquetado y entrega.

---

## **Tabla de contenidos**

- [Portada](#portada)
- [Resumen ejecutivo](#resumen-ejecutivo)
- [Integrantes y roles](#integrantes-y-roles)
- [Objetivos específicos](#objetivos-especificos)
- [Características principales / Funcionalidades](#caracteristicas-principales--funcionalidades)
- [Tecnologías utilizadas](#tecnologias-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución (local y nube) — paso a paso](#instalacion-y-ejecucion-local-y-nube--paso-a-paso)
- [Estructura del proyecto (árbol) y descripción de carpetas](#estructura-del-proyecto-arbol-y-descripcion-de-carpetas)
- [Mecanismo de login y rutas privadas](#mecanismo-de-login-y-rutas-privadas)
- [Formularios y componentes interactivos](#formularios-y-componentes-interactivos)
- [Rueda catadora digital (protótipo)](#rueda-catadora-digital-prototipo)
- [Principios de diseño aplicados (ANEXO 1)](#principios-de-diseno-aplicados-anexo-1)
- [Capturas y demostración](#capturas-y-demostracion)
- [Roadmap y próximas mejoras](#roadmap-y-proximas-mejoras)
- [Contacto de los integrantes](#contacto-de-los-integrantes)
- [Video demostrativo del funcionamiento](#video-demostrativo-del-funcionamiento)
---



## **Resumen ejecutivo**

`02_CafeSantander` es una aplicación front‑end que presenta la identidad y el catálogo de Café Santander. La FASE‑I entregada incluye una interfaz responsiva, navegación con rutas públicas y privadas, formularios, componentes multimedia y un prototipo interactivo de rueda catadora. El objetivo fue entregar una aplicación clara, documentada y lista para ser revisada por el docente.

## **Integrantes y roles**

-  **César Daniel Ávila Barbosa (Líder)** — 25% (coordinación y frontend)
-  **Juan David Neira Meza** — 25% (componentes y estilos)
-  **Nancy Liliana Sáenz Moreno** — 25% (multimedia y pruebas)
-  **Carlos David Pimienta Rivera** — 25% (routing y hooks)

## **Objetivos específicos**

1. Analizamos el contexto del comercio electrónico del café y documentamos oportunidades para posicionar un producto con identidad local; los resultados guiaron la selección de contenidos del sitio.
2. Diseñamos y prototipamos un flujo de exploración y compra accesible: catálogo, vista de producto y carrito simulado en frontend.
3. Construimos una interfaz intuitiva y responsiva adaptable a escritorio, tablet y móvil (CSS Grid/Flexbox y media queries).
4. Implementamos un sistema de autenticación simulado mediante un modal de Bootstrap; credenciales de prueba: Usuario `Admin`, Contraseña `1234`. El login habilita rutas privadas.
5. Implementamos un prototipo de rueda catadora digital para ayudar al usuario a seleccionar café según preferencias sensoriales.
6. Integramos contenido auténtico relacionado con la tradición cafetera de la familia del líder como elemento distintivo en secciones informativas.
7. Aplicamos principios de accesibilidad y usabilidad en el frontend: `alt` en imágenes, etiquetas en formularios, navegación fija y protección de rutas para evitar accesos directos no autorizados.

## **Características principales / Funcionalidades**

- Diseño responsivo (móvil / tablet / desktop).
- Portada con títulos, logo y barra de menú fija.
- Menú con dropdowns y navegación clara entre secciones.
- Rutas públicas y privadas (protección de acceso a rutas privadas mediante `AuthContext`).
- Modal de login (Bootstrap) con credenciales de prueba para evaluación.
- Carrito simulado y vista de productos con tarjetas (ProductCard).
- Formularios con `react-bootstrap/Form` (Contacto) y validación básica.
- Componentes interactivos: modales, collapse, popovers, dropdowns, carrusel y acordeón.
- Multimedia: imágenes, audio y video (carpeta `public/`).
- Footer con ficha de integrantes y enlaces a redes sociales.

## **Tecnologías utilizadas**

- React (v19.1)
- JavaScript (ES2020)
- Vite (v7.2)
- React Router (v7.9)
- Bootstrap 5 + React-Bootstrap
- ESLint (v9.36)
- Node.js / npm

## **Requisitos previos**

- Node.js v18+ (recomendado v20+)
- npm v9+
- Git
- Navegador moderno con soporte para JavaScript ES2020

## **Instalación y ejecución (local y nube) — paso a paso**


| Paso | Comando (PowerShell) | Descripción | Notas |
|------|----------------------|-------------|-------|
| Comprobaciones previas | `node -v`<br>`npm -v`<br>`git --version` | Verificar que Node (>=18), npm (>=9) y Git están instalados | Actualizar Node si es necesario (nvm-windows) |
| Crear carpeta local (opcional) | `mkdir $env:USERPROFILE\MisProyectos`<br>`Set-Location $env:USERPROFILE\MisProyectos` | Crea y entra a la carpeta donde clonarás el repo | Cambia la ruta si prefieres otro directorio |
| Clonar repo | `git clone https://github.com/n4ncy27/02_CafeSantander.git` | Descarga el repositorio a tu equipo | Usa el botón Code → HTTPS en GitHub si cambias la URL |
| Entrar en el proyecto | `cd 02_CafeSantander\cafe-react` | Coloca la terminal en la carpeta del frontend | Es la ruta donde están package.json y src |
| Abrir en VS Code (opcional) | `code .` | Abre la carpeta actual en Visual Studio Code | Si `code` no está en PATH, abre VS Code y usa Archivo → Abrir carpeta... |
| Instalar dependencias | `npm install` (o `npm ci`) | Instala módulos necesarios | `npm ci` es reproducible para CI/entornos limpios |
| Verificar código | `npm run lint` | Ejecuta ESLint para revisar la calidad del código | 0 errores esperados en el código actual |
| Ejecutar en modo desarrollo | `npm run dev` | Inicia Vite dev server y recarga en cambios | Abre la URL que muestre Vite (ej. `http://localhost:5173`) |
| Build producción | `npm run build` | Genera la carpeta `dist/` con archivos estáticos | Preparado para ser servido por cualquier hosting estático |
| Previsualizar producción | `npm run preview`<br>o `npx serve dist -l 5173` | Ver la versión de producción localmente | `npx serve` sirve la carpeta `dist` rápidamente |
| Docker (opcional) | `docker build -t cafe-santander:latest .`<br>`docker run -p 8080:80 cafe-santander:latest` | Construir y ejecutar imagen Docker | Requiere Docker Desktop instalado |
| Deploy (Vercel / Netlify / Render) | (config. en la UI) Build: `npm run build`<br>Publish: `dist` | Deploy automático al conectar el repo | Establecer root a `02_CafeSantander/cafe-react` si pide subcarpeta |


## **Estructura del proyecto (árbol) y descripción de carpetas**

```text
02_CafeSantander/
└─ cafe-react/
   ├─ .gitignore
   ├─ index.html
   ├─ package.json
   ├─ package-lock.json
   ├─ eslint.config.js
   ├─ vite.config.js
   ├─ node_modules/ (no commiteada normalmente)
   ├─ public/
   │  ├─ imagenes/  (logos, fotos, cafe/)
   │  ├─ audio/
   │  └─ video/
   ├─ src/
   │  ├─ assets/    (imágenes y recursos importados)
   │  ├─ components/ (Header, Footer, Modales, ProductCard, PrivateRoute, etc.)
   │  ├─ context/    (AuthContext.jsx, useAuth.js, authUtils.js)
   │  ├─ hooks/      (useCart.js)
   │  ├─ pages/      (Inicio.jsx, Productos.jsx, Carrito.jsx, Contacto.jsx, Acerca.jsx, Servicios.jsx)
   │  ├─ styles/     (CSS por página: acerca.css, carrito.css, contacto.css, servicios.css, global.css)
   │  ├─ App.jsx
   │  ├─ App.css
   │  ├─ index.css
   │  ├─ main.jsx
   │  └─ (componentes y archivos JavaScript según necesidad)
   └─ dist/ (generado al ejecutar npm run build)
```

Breve explicación de carpetas clave

- `public/`: recursos estáticos que se sirven directamente (imágenes, audio, video). Ideal para assets que no requieren import dinámico.
- `src/`: código fuente principal de la aplicación.
  - `components/`: componentes React reutilizables (Header, Footer, modales, tarjetas, etc.).
  - `pages/`: vistas (rutas) que representan cada página del sitio.
  - `context/`: contextos y hooks de autenticación (AuthContext.jsx, useAuth.js, authUtils.js).
  - `hooks/`: hooks personalizados (useCart.js para gestión del carrito).
  - `styles/`: archivos CSS organizados por página o globales.
  - `assets/`: imágenes y otros recursos importados desde JavaScript.

## **Mecanismo de login y rutas privadas**

- Modal de login: `src/components/BootstrapLoginModal.jsx`.
- Contexto de autenticación: `src/context/AuthContext.jsx`.
- Hook de autenticación: `src/context/useAuth.js`.
- Protección de rutas: `src/components/PrivateRoute.jsx`.

Credenciales de evaluación (simulación):

- Usuario: `Admin`
- Contraseña: `1234`

Flujo resumido: al iniciar sesión con las credenciales anteriores, `AuthContext` actualiza el estado a autenticado y las rutas privadas se vuelven accesibles; `PrivateRoute` impide el acceso directo por URL cuando el usuario no está autenticado.

## **Formularios y componentes interactivos**

- Formularios: `src/pages/Contacto.jsx` usa `react-bootstrap/Form` con validación básica.
- Componentes interactivos: Carrusel, Acordeón, Collapse, Popover y Dropdown disponibles mediante `react-bootstrap`.
- Multimedia: archivos en `public/video/` y `public/audio/` con controles de reproducción integrados.

## **Rueda catadora digital (protótipo)**

Se incluyó un prototipo de rueda catadora en la sección de Productos/Servicios para orientar la selección del café con base en preferencias sensoriales (sabor, aroma, intensidad). El componente es interactivo y sirve como base para futuras mejoras.

## **Calidad de código y linting**

- **ESLint**: Configurado con soporte para React y JavaScript moderno (ES2020).
- **Sin errores de linting**: El código ha sido revisado y optimizado para cumplir con los estándares de ESLint.
- **Mejores prácticas**: Imports limpios, hooks correctamente configurados, manejo de errores documentado.
- Ejecuta `npm run lint` para verificar la calidad del código en cualquier momento.

## **Principios de diseño aplicados (ANEXO 1)**

- Contraste de color para legibilidad.
- Jerarquía visual mediante tipografías y espaciado.
- Consistencia visual con componentes reutilizables.
- Accesibilidad básica: `alt` en imágenes, labels en formularios y foco visible en elementos interactivos.
- Usabilidad: barra de navegación fija y estructura clara de contenidos.

## **Capturas y demostración**

Las siguientes capturas corresponden a pantallas principales de la aplicación. Para verlas localmente (mientras el servidor de desarrollo de Vite está corriendo) coloca las imágenes en `public/imagenes/cafe/` con los nombres indicados y ábrelas en el navegador o visualízalas dentro del README cuando el servidor esté activo.

Local (desarrollo): http://localhost:5173/imagenes/cafe/


Capturas incluidas (añade los archivos en `public/imagenes/cafe/`):

A continuación se listan las capturas sugeridas y los nombres de archivo recomendados. Guarda las imágenes en `public/imagenes/cafe/` con los nombres indicados para que se muestren correctamente en el README y en el servidor de desarrollo.

- `portada-1.png` — Portada y header con menú (vista principal).
- `login-modal.png` — Modal de inicio de sesión (con control de visibilidad de contraseña / CAPTCHA si aplica).
- `ruleta-catadora.png` — Rueda catadora interactiva (página Servicios).
- `historia.png` — Sección «Nuestra Historia» (banner o imagen informativa).
- `productos.png` — Página o sección de «Nuestros productos» (galería o tarjetas de producto).
- Las imagenes que no esten aquí al final encontraran un video donde estan el funcionamiento o desde la pagina lo podran observar 

Vista previa

![Portada]<img width="1266" height="649" alt="image" src="  <img width="985" height="560" alt="image" src="https://github.com/user-attachments/assets/9187d64c-f427-491a-8798-1fa5f47ea813" />
" />


![Login modal]<img width="744" height="524" alt="image" src="<img width="980" height="546" alt="image" src="https://github.com/user-attachments/assets/89ba87d7-6392-4146-a708-01fb820629ff" />
" />


![Ruleta catadora]<img width="935" height="646" alt="image" src="<img width="986" height="551" alt="image" src="https://github.com/user-attachments/assets/ad1078c6-2710-41a0-a903-7dcf3b1c26f8" />
" />


![Carrito]<img width="693" height="648" alt="image" src="<img width="988" height="550" alt="image" src="https://github.com/user-attachments/assets/3a8bed12-97d1-47ef-97aa-6408f5c557ff" />
" />


![Nuestros productos]<img width="666" height="575" alt="image" src="<img width="971" height="515" alt="image" src="https://github.com/user-attachments/assets/5bde1d3f-728a-4b95-a04f-505cd571e8db" />
" />




- **🆕 Panel de Administración Implementado** ✅
  - CRUD completo para productos ( producto - cafés especializados)
  - CRUD completo para usuarios
  - Búsquedas y filtrado en tiempo real
  - Estadísticas en tiempo real
  - Interfaz profesional y responsiva
  - Documentación exhaustiva incluida

- Añadir encuesta y estadísticas.
- Mejorar la rueda catadora con datos sensoriales guardados por usuario.
- Implementar captcha y validaciones robustas en formularios.
- Mejorar el estilo CSS.
- Entre otras mejoras conforme avancemos.

## **🆕 Panel de Administración (NUEVO)**

Se ha implementado una **sección completa de administración** para gestionar productos y usuarios.

### Acceso
- **Ubicación**: Botón "Admin" en la esquina superior derecha del sitio
- **Usuario**: `admin`
- **Contraseña**: `123`

### Características
- ✅ **CRUD de Productos**: Crear, leer, actualizar, eliminar y buscar productos
- ✅ **CRUD de Usuarios**: Leer, actualizar, eliminar y buscar usuarios
- ✅ **Estadísticas**: Total de productos, usuarios y carritos activos
- ✅ **Búsqueda**: Búsqueda en tiempo real para productos y usuarios
- ✅ **Interfaz Responsiva**: Funciona en móvil, tablet y desktop
- ✅ **Validaciones**: Validación de datos en formularios
- ✅ **Documentación**: Guías completas para uso y desarrollo

### Documentación de Admin
Para más detalles sobre el panel de administración, consulta:
- **[QUICK_START.md](./QUICK_START.md)** - Inicio rápido (5 minutos)
- **[ADMIN_DOCUMENTATION.md](./ADMIN_DOCUMENTATION.md)** - Guía completa
- **[ADMIN_TESTING_GUIDE.md](./ADMIN_TESTING_GUIDE.md)** - Guía de pruebas
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Diagramas y arquitectura
- **[API_EXAMPLES.md](./API_EXAMPLES.md)** - Ejemplos de API
- **[TUTORIAL_VISUAL.md](./TUTORIAL_VISUAL.md)** - Tutorial visual paso a paso
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Índice completo de documentación
- **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)** - Resumen ejecutivo para evaluadores

---

## **Backend y Base de Datos**

### Requisitos
- Node.js v18+
- MySQL Server (XAMPP recomendado)

### Instalación Backend
```bash
cd backend
npm install
npm start  # o npm run dev (con nodemon)
```

El backend se ejecutará en `http://localhost:5000`

### Base de Datos
La base de datos MySQL `cafeDB` incluye:
- Tabla `productos` - 47 cafés especializados
- Tabla `usuarios` - Usuarios registrados
- Tabla `carritos` - Carritos de compra
- Tabla `carrito_items` - Items en los carritos

### Credenciales de BD
- **Usuario**: `un_usr`
- **Contraseña**: `una_clave`
- **Database**: `cafeDB`

Para crear la BD, ejecuta el script en `backend/db/schema.sql`

---


## **Contacto de los integrantes**

- César Daniel Ávila Barbosa —  cesar2224642@correo.uis.edu.co  — 25%
- Juan David Neira Meza —  juan2235605@correo.uis.edu.co — 25%
- Nancy Liliana Sáenz Moreno —nancy2224510@correo.uis.edu.co — 25%
- Carlos David Pimienta Rivera — carlos2224380@correo.uis.edu.co  — 25%

---
## **Video demostrativo del funcionamiento**

https://youtu.be/QxDMWHpL8ZY?feature=shared

