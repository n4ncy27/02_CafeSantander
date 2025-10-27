## Proyecto: Café Santander — FASE I 

Este repositorio contiene la aplicación web desarrollada en React + TypeScript con Vite para la entrega de la FASE‑I del proyecto.

## Portada

- Nombre del aplicativo: Café Santander
<p align="center">**_02_CafeSantander — FASE I_**</p>

<p align="center">**_Aplicación web: Café Santander_**</p>

Esta es la entrega de la FASE‑I del proyecto de grupo (Grupo 2). El repositorio contiene la aplicación front‑end desarrollada en React + TypeScript con Vite, la documentación de uso y las instrucciones para empaquetado y entrega.

---

<p align="center">**_Tabla de contenidos_**</p>

- [Resumen ejecutivo](#resumen-ejecutivo)
- [Integrantes y roles](#integrantes-y-roles)
- [Objetivos específicos — Lo que hicimos](#objetivos-espec%C3%ADficos---lo-que-hicimos)
- [Características principales / Funcionalidades](#caracter%C3%ADsticas-principales--funcionalidades)
- [Tecnologías utilizadas](#tecnolog%C3%ADas-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local (PowerShell) — paso a paso](#instalaci%C3%B3n-y-ejecuci%C3%B3n-local-powershell--paso-a-paso)
- [Estructura del proyecto (árbol) y descripción de carpetas](#estructura-del-proyecto-%C3%A1rbol-y-descripci%C3%B3n-de-carpetas)
- [Mecanismo de login y rutas privadas](#mecanismo-de-login-y-rutas-privadas)
- [Formularios y componentes interactivos](#formularios-y-componentes-interactivos)
- [Rueda catadora digital (protótipo)](#rueda-catadora-digital-prot%C3%B3tipo)
- [Principios de diseño aplicados (ANEXO 1)](#principios-de-dise%C3%B1o-aplicados-anexo-1)
- [Logros y alcance del proyecto](#logros-y-alcance-del-proyecto)
- [Capturas y demostración](#capturas-y-demostraci%C3%B3n)
- [Instrucciones para empaquetar y entregar (xx_App.zip)](#instrucciones-para-empaquetar-y-entregar-xx_appzip)
- [Roadmap y próximas mejoras](#roadmap-y-pr%C3%B3ximas-mejoras)
- [Contribución](#contribuci%C3%B3n)
- [Contacto de los integrantes](#contacto-de-los-integrantes)

---

<p align="center">**_Resumen ejecutivo_**</p>

`02_CafeSantander` es una aplicación front‑end que presenta la identidad y el catálogo de Café Santander. La FASE‑I entregada incluye una interfaz responsiva, navegación con rutas públicas y privadas, formularios, componentes multimedia y un prototipo interactivo de rueda catadora. El objetivo fue entregar una aplicación clara, documentada y lista para ser revisada por el docente.

<p align="center">**_Integrantes y roles_**</p>

- César Daniel Ávila Barbosa (Líder) — 25% (coordinación y frontend)
- Juan David Neira Meza — 25% (componentes y estilos)
- Nancy Liliana Sáenz Moreno — 25% (multimedia y pruebas)
- Carlos David Pimienta Rivera — 25% (routing y hooks)

> El líder debe enviar el enlace del repositorio al docente y, si el repo es privado, provisión de acceso.

<p align="center">**_Objetivos específicos — Lo que hicimos_**</p>

1. Analizamos el contexto del comercio electrónico del café y documentamos oportunidades para posicionar un producto con identidad local; los resultados guiaron la selección de contenidos del sitio.
2. Diseñamos y prototipamos un flujo de exploración y compra accesible: catálogo, vista de producto y carrito simulado en frontend.
3. Construimos una interfaz intuitiva y responsiva adaptable a escritorio, tablet y móvil (CSS Grid/Flexbox y media queries).
4. Implementamos un sistema de autenticación simulado mediante un modal de Bootstrap; credenciales de prueba: Usuario `Admin`, Contraseña `1234`. El login habilita rutas privadas.
5. Implementamos un prototipo de rueda catadora digital para ayudar al usuario a seleccionar café según preferencias sensoriales.
6. Integramos contenido auténtico relacionado con la tradición cafetera de la familia del líder como elemento distintivo en secciones informativas.
7. Aplicamos principios de accesibilidad y usabilidad en el frontend: `alt` en imágenes, etiquetas en formularios, navegación fija y protección de rutas para evitar accesos directos no autorizados.

<p align="center">**_Características principales / Funcionalidades_**</p>

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

<p align="center">**_Tecnologías utilizadas_**</p>

- React (v19)
- TypeScript
- Vite
- React Router (v7)
- Bootstrap 5 + React-Bootstrap
- ESLint / TypeScript
- Node.js / npm

<p align="center">**_Requisitos previos_**</p>

- Node.js v18+ (recomendado)
- npm v9+ (recomendado)
- Git
- Navegador moderno

<p align="center">**_Instalación y ejecución local (PowerShell) — paso a paso_**</p>

Ejecuta los siguientes comandos en PowerShell desde tu máquina (reemplaza `<usuario>` y `<repositorio>` por los reales si corresponde):

```powershell
# 1. Clonar el repositorio y entrar a la carpeta del proyecto
git clone https://github.com/<usuario>/<repositorio>.git
cd 02_CafeSantander\cafe-react

# 2. Instalar dependencias
npm install

# 3. Ejecutar modo desarrollo (Vite)
npm run dev

# 4. Para producción: construir y previsualizar
npm run build
npm run preview
```

Después de `npm run dev` abre la URL que Vite indique (por ejemplo `http://localhost:5173`).

<p align="center">**_Estructura del proyecto (árbol) y descripción de carpetas_**</p>

```text
02_CafeSantander/
└─ cafe-react/
   ├─ .gitignore
   ├─ index.html
   ├─ package.json
   ├─ package-lock.json
   ├─ node_modules/ (no commiteada normalmente)
   ├─ public/
   │  ├─ imagenes/  (logos, fotos)
   │  ├─ audio/
   │  └─ video/
   ├─ src/
   │  ├─ assets/    (imágenes y recursos importados)
   │  ├─ components/ (Header, Footer, Modales, ProductCard, PrivateRoute)
   │  ├─ context/    (AuthContext.tsx)
   │  ├─ hooks/      (useCart y hooks personalizados)
   │  ├─ pages/      (Inicio, Productos, Carrito, Contacto, Acerca, Servicios)
   │  ├─ styles/     (css por página y global)
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ index.css
   │  ├─ main.tsx
   │  └─ (otros archivos TypeScript/JS según componentes)
   ├─ tsconfig.json
   ├─ tsconfig.app.json
   ├─ tsconfig.node.json
   └─ vite.config.ts
```

Breve explicación de carpetas clave

- `public/`: recursos estáticos que se sirven directamente (imágenes, audio, video). Ideal para assets que no requieren import dinámico.
- `src/`: código fuente principal de la aplicación.
  - `components/`: componentes React reutilizables (Header, Footer, modales, tarjetas, etc.).
  - `pages/`: vistas (rutas) que representan cada página del sitio.
  - `context/`: contextos React (aquí `AuthContext` para simular autenticación).
  - `hooks/`: hooks personalizados (p. ej. `useCart`).
  - `styles/`: archivos CSS organizados por página o globales.
  - `assets/`: imágenes y otros recursos importados desde TypeScript/JS.

Nota: la estructura mostrada refleja el estado actual del directorio `cafe-react` en este repositorio. Si deseas que incorpore una carpeta `src/backend/` y `src/frontend/` para organización, dímelo y las crearé sin mover archivos existentes (o puedo mover carpetas y actualizar imports si me lo autorizas).

<p align="center">**_Mecanismo de login y rutas privadas_**</p>

- Modal de login: `src/components/BootstrapLoginModal.tsx`.
- Contexto de autenticación: `src/context/AuthContext.tsx`.
- Protección de rutas: `src/components/PrivateRoute.tsx`.

Credenciales de evaluación (simulación):

- Usuario: `Admin`
- Contraseña: `1234`

Flujo resumido: al iniciar sesión con las credenciales anteriores, `AuthContext` actualiza el estado a autenticado y las rutas privadas se vuelven accesibles; `PrivateRoute` impide el acceso directo por URL cuando el usuario no está autenticado.

<p align="center">**_Formularios y componentes interactivos_**</p>

- Formularios: `src/pages/Contacto.tsx` usa `react-bootstrap/Form` con validación básica.
- Componentes: Carrusel, Acordeón, Collapse, Popover y Dropdown disponibles mediante `react-bootstrap`.
- Multimedia: archivos en `public/video/` y `public/audio/` con controles de reproducción.

<p align="center">**_Rueda catadora digital (protótipo)_**</p>

Se incluyó un prototipo de rueda catadora en la sección de Productos/Servicios para orientar la selección del café con base en preferencias sensoriales (sabor, aroma, intensidad). El componente es interactivo y sirve como base para futuras mejoras.

<p align="center">**_Principios de diseño aplicados (ANEXO 1)_**</p>

- Contraste de color para legibilidad.
- Jerarquía visual mediante tipografías y espaciado.
- Consistencia visual con componentes reutilizables.
- Accesibilidad básica: `alt` en imágenes, labels en formularios y foco visible en elementos interactivos.
- Usabilidad: barra de navegación fija y estructura clara de contenidos.

<p align="center">**_Logros y alcance del proyecto_**</p>

- Interfaz responsiva y navegable en distintos dispositivos.
- Rutas públicas y privadas con autenticación simulada funcional.
- Formularios y validaciones básicas implementadas.
- Componentes interactivos y multimedia integrados.
- Prototipo de rueda catadora digital.
- Documentación para instalación, ejecución y empaquetado incluida en este README.

<p align="center">**_Capturas y demostración_**</p>

Las siguientes capturas corresponden a pantallas principales de la aplicación. Para verlas localmente (mientras el servidor de desarrollo de Vite está corriendo) coloca las imágenes en `public/imagenes/cafe/` con los nombres indicados y ábrelas en el navegador o visualízalas dentro del README cuando el servidor esté activo.

Local (desarrollo): http://localhost:5173/imagenes/cafe/

Capturas incluidas (añade los archivos en `public/imagenes/cafe/`):

- `/imagenes/cafe/portada-1.png` — Portada y header con menú.
- `/imagenes/cafe/login-modal.png` — Modal de inicio de sesión (con CAPTCHA y control de visibilidad de contraseña).
- `/imagenes/cafe/ruleta-catadora.png` — Rueda catadora interactiva en la página de Servicios.
- `/imagenes/cafe/historia.png` — Sección «Nuestra Historia» (banner principal).

Ejemplo de cómo se verán en local (URL de ejemplo):

- http://localhost:5173/imagenes/cafe/portada-1.png
- http://localhost:5173/imagenes/cafe/login-modal.png
- http://localhost:5173/imagenes/cafe/ruleta-catadora.png
- http://localhost:5173/imagenes/cafe/historia.png

Galería (si las imágenes están en `public/imagenes/cafe/` se mostrarán aquí cuando el servidor esté activo):

![Portada](/imagenes/cafe/portada-1.png)

![Login modal](/imagenes/cafe/login-modal.png)

![Ruleta catadora](/imagenes/cafe/ruleta-catadora.png)

![Nuestra historia](/imagenes/cafe/historia.png)

(Si las imágenes no aparecen en el README cuando lo ves directamente en GitHub, recuerda que el servidor de desarrollo sirve `public/` en la raíz; en GitHub las imágenes deben estar comprometidas en el repo en `public/imagenes/cafe/` para mostrarse).</p>
Incluye capturas en `public/imagenes/cafe/` y actualiza las rutas en este README si deseas mostrar imágenes concretas en la documentación.

<p align="center">**_Instrucciones para empaquetar y entregar (xx_App.zip)_**</p>

1. Ejecutar `npm run build` para generar `dist/`.
2. Crear carpeta `02_App` y copiar dentro:
   - Carpeta `cafe-react` completa **sin** `node_modules`.
   - Archivo `02_aplicativo.pdf` con portada, capturas y anexos.
   - `Readme.txt` corto (versión resumida de este README).
3. Comprimir la carpeta `02_App` en `02_App.zip` y subir a meiweb24 o proporcionar enlace al docente.

> Recomendación: incluir `dist/` en el zip si desea que el docente pueda ver la versión construida sin ejecutar `npm install`.

<p align="center">**_Roadmap y próximas mejoras_**</p>

- Integrar backend para autenticación real y persistencia (BD).
- Añadir encuesta y estadísticas.
- Mejorar la rueda catadora con datos sensoriales guardados por usuario.
- Implementar captcha y validaciones robustas en formularios.

<p align="center">**_Contribución_**</p>

Si deseas colaborar:

1. Fork del proyecto.
2. Clonar tu fork y crear una rama feature.
3. Hacer cambios, pruebas y enviar Pull Request con descripción clara.

Convenciones de commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`.

<p align="center">**_Contacto de los integrantes_**</p>

- César Daniel Ávila Barbosa — correo@ejemplo.com — 25%
- Juan David Neira Meza — correo@ejemplo.com — 25%
- Nancy Liliana Sáenz Moreno — correo@ejemplo.com — 25%
- Carlos David Pimienta Rivera — correo@ejemplo.com — 25%

---

Si quieres, genero ahora un `Readme.txt` resumido listo para incluir en el zip o una plantilla `02_aplicativo.md` lista para convertir a PDF con la portada y las secciones solicitadas. Dime cuál prefieres y lo creo.

- [Resumen ejecutivo](#resumen-ejecutivo)
- [Integrantes y roles](#integrantes-y-roles)
- [Objetivos del proyecto](#objetivos-del-proyecto)
- [Tecnologías utilizadas](#tecnolog%C3%ADas-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local (PowerShell) - paso a paso](#instalaci%C3%B3n-y-ejecuci%C3%B3n-local-powershell---paso-a-paso)
- [Despliegue en la nube (resumen rápido)](#despliegue-en-la-nube-resumen-r%C3%A1pido)
- [Estructura del proyecto (árbol) y descripción de carpetas](#estructura-del-proyecto-%C3%A1rbol-y-descripci%C3%B3n-de-carpetas)
- [Funcionalidades implementadas (detalle)](#funcionalidades-implementadas-detalle)
- [Mecanismo de login y rutas privadas](#mecanismo-de-login-y-rutas-privadas)
- [Formularios y componentes interactivos](#formularios-y-componentes-interactivos)
- [Principios de diseño aplicados (ANEXO 1)](#principios-de-dise%C3%B1o-aplicados-anexo-1)
- [ANEXO 2 — Implementado / No implementado](#anexo-2--implementado--no-implementado)
- [Captura / Vista previa](#captura--vista-previa)
- [Bibliografía y referencias](#bibliograf%C3%ADa-y-referencias)
- [Conclusiones y aprendizajes](#conclusiones-y-aprendizajes)
- [Instrucciones para empaquetar y entregar (xx_App.zip)](#instrucciones-para-empaquetar-y-entregar-xx_appzip)
- [Contacto de los integrantes](#contacto-de-los-integrantes)

## Resumen ejecutivo

`02_CafeSantander` es una aplicación web front-end desarrollada con React + TypeScript y Vite. Está pensada para presentar la identidad y el catálogo de un café, mostrando buenas prácticas de diseño web, navegación segura usando rutas públicas/privadas y componentes interactivos (modal, carrusel, acordeón, multimedia, formularios con React-Bootstrap).

## Integrantes y roles

- César Daniel Ávila Barbosa (Líder) — 25% (coordinación y Frontend)
- Juan David Neira Meza — 25% (componentes y estilos)
- Nancy Liliana Sáenz Moreno — 25% (multimedia y pruebas)
- Carlos David Pimienta Rivera — 25% (routing y hooks)

> El líder deberá entregar el enlace al repositorio al docente y encargarse de la verificación final antes del empaquetado.

## Objetivos del proyecto

**Objetivo general**

- Desarrollar una interfaz web atractiva y funcional para la marca "Café Santander" que sirva como entrega de FASE‑I, mostrando dominio de técnicas de diseño responsivo, navegación y componentes interactivos.

**Objetivos específicos**

- Implementar un sitio responsivo para Desktop/Tablet/Móvil.
- Proteger rutas privadas mediante un flujo de login simulado (sin BD en esta fase).
- Incluir formularios, multimedia y componentes de Bootstrap (modal, collapse, popover, dropdown, carousel, accordion).
- Organizar la estructura del proyecto y documentar su contenido para facilitar despliegue y empaquetado.

## Tecnologías utilizadas

- React (v19)
- TypeScript
- Vite (dev server y build)
- React Router (v7)
- Bootstrap 5 + React-Bootstrap
- ESLint / TypeScript para calidad de código
- Node.js / npm

## Requisitos previos

- Node.js (recomendado: v18 o superior)
- npm (recomendado: v9 o superior)
- Git (para clonar el repositorio)
- Un navegador moderno (Chrome/Edge/Firefox)

## Instalación y ejecución local (PowerShell) - paso a paso

Sigue estos pasos exactos en PowerShell (Windows). Reemplaza `<usuario>` y `<repositorio>` por la ruta real si aplica.

1) Clonar el repositorio y moverse a la carpeta del proyecto

```powershell
git clone https://github.com/<usuario>/<repositorio>.git
cd 02_CafeSantander\cafe-react
```

2) Instalar dependencias

```powershell
npm install
```

3) Ejecutar servidor de desarrollo (Vite)

```powershell
npm run dev
```

- Después de ejecutar `npm run dev`, Vite mostrará una URL (por ejemplo `http://localhost:5173`). Ábrela en el navegador.

4) Construir para producción

```powershell
npm run build
```

5) Probar build localmente (preview)

```powershell
npm run preview
```

Problemas comunes y soluciones rápidas

- Si `npm run dev` falla con un error de puerto, cierre el proceso que usa ese puerto o cambie el puerto en `vite.config.ts`.
- Si faltan dependencias, verifique la versión de Node/npm y vuelva a ejecutar `npm install`.

## Despliegue en la nube (resumen rápido)

Opción recomendada (rápida): Vercel

1. Crear cuenta en vercel.com y conectar con GitHub.
2. Importar el repositorio y seleccionar la carpeta `cafe-react` como root (si el repo es monorepo).
3. Comando de build: `npm run build`.
4. Directorio de salida: `dist`.

Alternativa: Netlify

- En Netlify, configurar build command `npm run build` y publish directory `dist`.

Azure Static Web Apps o GitHub Pages también son posibles; las instrucciones específicas se agregan si el docente lo solicita.

## Estructura del proyecto (árbol) y descripción de carpetas

Árbol simplificado (raíz: `cafe-react`)

```text
02_CafeSantander/
└─ cafe-react/
    ├─ public/
    │  ├─ imagenes/
    │  │  └─ cafe/ (logos y fotos)
    │  ├─ audio/
    │  └─ video/
    ├─ src/
    │  ├─ assets/ (imágenes usadas por componentes)
    │  ├─ components/
    │  │  ├─ Header.tsx
    │  │  ├─ Footer.tsx
    │  │  ├─ BootstrapLoginModal.tsx
    │  │  ├─ PrivateRoute.tsx
    │  │  ├─ ProductCard.tsx
    │  │  └─ InlineCartPreview.tsx
    │  ├─ context/
    │  │  └─ AuthContext.tsx
    │  ├─ hooks/
    │  │  └─ useCart.ts
    │  ├─ pages/
    │  │  ├─ Inicio.tsx
    │  │  ├─ Productos.tsx
    │  │  ├─ Carrito.tsx
    │  │  ├─ Acerca.tsx
    │  │  ├─ Contacto.tsx
    │  │  └─ Servicios.tsx
    │  ├─ styles/
    │  │  ├─ global.css
    │  │  ├─ acerca.css
    │  │  └─ carrito.css
    │  ├─ App.tsx
    │  └─ main.tsx
    ├─ package.json
    ├─ tsconfig.json
    └─ vite.config.ts
```

Descripción breve de las carpetas principales

- `public/`: recursos estáticos que se sirven directamente (imágenes, video, audio). Ideal para assets que no requieren import dinámico.
- `src/`: código fuente principal de la aplicación.
   - `components/`: componentes React reutilizables (Header, Footer, modales, tarjetas, etc.).
   - `pages/`: vistas (rutas) que representan cada página del sitio.
   - `context/`: contextos React (aquí `AuthContext` para simular autenticación).
   - `hooks/`: hooks personalizados (p. ej. `useCart`).
   - `styles/`: archivos CSS organizados por página o globales.
- `package.json`: scripts y dependencias; `dev` para desarrollo, `build` para producción.

## Funcionalidades implementadas (detalle)

1) Diseño responsivo

- Se aplicaron estilos flexibles (Flexbox y Grid), media queries y clases utilitarias para adaptar el contenido a pantallas móviles, tablets y escritorio.
- Elementos clave como el header y el footer se ajustan: menú colapsable en móvil, menú horizontal en desktop, cards de productos reordenables.

2) Componentes de la portada

- **Títulos y logo**: la portada (`Inicio.tsx`) muestra el logo y un título principal (H1) con subtítulo.
- **Barra de menús fija**: `Header.tsx` implementa una barra de navegación fija en la parte superior (sticky/fixed).
- **Diseño a tres columnas**: se usa en secciones de contenido principal; el layout colapsa a 1 columna en móviles.
- **Efectos**:
   - *Fade*: transiciones suaves para entradas de secciones (CSS transitions / classes).
   - *Modal*: Login y modales informativos implementados con `react-bootstrap`.
   - *Collapse*: elementos colapsables para FAQ/servicios.
   - *Popover*: usado para ayudas y descripciones breves (cuando aplica).
   - *Dropdown*: menús desplegables en el header para accesos rápidos.

3) Sistema de rutas (Router)

- Implementado con `react-router-dom`.
- **Rutas públicas**: Inicio, Acerca, Servicios, Productos (lista), Contacto.
- **Rutas privadas**: Carrito (y otras rutas que el equipo defina). El acceso a estas rutas exige autenticación simulada.

4) Mecanismo de login (simulación)

- El login es un **modal de Bootstrap** (`BootstrapLoginModal.tsx`) que pide usuario y contraseña.
- Las credenciales de prueba están codificadas para FASE‑I:

   - Usuario: **Admin**
   - Contraseña: **1234**

- Al iniciar sesión correctamente, `AuthContext` cambia `isAuthenticated` a `true` y el menú muestra las rutas privadas. La protección de rutas evita acceso directo por URL (no permite "puertas traseras") ya que `PrivateRoute` redirige al usuario si no está autenticado.

5) Componentes interactivos: Carrusel, Acordeón, multimedia

- **Carrusel**: presentaciones de imágenes en la portada o secciones de promociones (puede implementarse con `Carousel` de `react-bootstrap`).
- **Acordeón**: para secciones de preguntas frecuentes o descripción de servicios.
- **Videos y sonidos**: archivos en `public/video/` y `public/audio/` con controles para reproducción.

6) Formularios

- Se implementó un formulario de contacto (`Contacto.tsx`) usando `react-bootstrap/Form` con validación básica de campos (nombre, email, mensaje).

7) Footer (Pie de página)

- `Footer.tsx` incluye la sección **Contáctenos** con los miembros del equipo; al hacer clic en cada miembro se muestra un modal con sus datos básicos y foto.
- Enlaces a **al menos tres redes sociales** (ejemplo: Facebook, Twitter, Instagram) apuntando a perfiles de ejemplo o a `#` si no hay cuentas reales.

## Mecanismo de login y rutas privadas (código y flujo)

- **Archivo principal de autenticación**: `src/context/AuthContext.tsx` — mantiene `isAuthenticated`, `login()` y `logout()`.
- **Modal de login**: `src/components/BootstrapLoginModal.tsx` — recoge credenciales y llama a `login()` del contexto.
- **Protección de rutas**: `src/components/PrivateRoute.tsx` — si `isAuthenticated` es `false`, redirige a la página pública (p. ej. Inicio) o muestra el modal de login.

Flujo resumido:

1. Usuario entra a `/carrito` (ruta privada).
2. `PrivateRoute` verifica `isAuthenticated`.
3. Si no está autenticado, se redirige a `/` o se abre el modal de login.
4. Con credenciales `Admin/1234`, `AuthContext.login()` convierte `isAuthenticated` en `true`.
5. El usuario puede acceder a `/carrito` y otras rutas privadas.

## Formularios y validación

- El formulario de `Contacto.tsx` utiliza `react-bootstrap/Form`.
- Validaciones implementadas: campos obligatorios (nombre, email, mensaje) y formato básico de email. Mensajes de error mostrados en el formulario.

## Principios de diseño aplicados (ANEXO 1)

1. **Contraste de color**: combinación de colores con ratio apropiado para legibilidad entre texto y fondo.
2. **Jerarquía visual**: uso de tamaños tipográficos y espaciado para mejorar la lectura (H1, H2, párrafos y llamadas a la acción).
3. **Consistencia**: componentes reutilizables y un sistema de clases CSS para mantener estilos homogéneos.
4. **Accesibilidad básica**: atributos `alt` en imágenes, labels en formularios y controles focusables.
5. **Usabilidad y navegación**: barra de menú fija para permitir navegación rápida entre secciones.

## ANEXO 2 — Implementado / No implementado

- **Implementado**:
   - Diseño responsivo.
   - Header fijo, footer con contactos y redes.
   - Modal de login simulado y protección de rutas privadas.
   - Formularios usando `react-bootstrap`.
   - Organización de carpetas y documentación básica en código (comentarios).

- **Parcial / No implementado**:
   - Encuesta (requisito de rúbrica: falta implementar la encuesta integrada).
   - Integración con backend / BD para autenticación (simulación en esta FASE‑I).
   - Algunas animaciones avanzadas o captchas (opcionales) no están implementadas.

## Captura / Vista previa

Incluye aquí una captura de pantalla de la portada (reemplaza el archivo o la ruta por la captura real):

![Captura de la portada](public/imagenes/cafe/portada-placeholder.png)

*(Reemplaza `public/imagenes/cafe/portada-placeholder.png` por la imagen real antes de empaquetar.)*

## Bibliografía y referencias

- React: https://reactjs.org/
- Vite: https://vitejs.dev/
- React Router: https://reactrouter.com/
- React Bootstrap: https://react-bootstrap.github.io/
- W3C Web Accessibility: https://www.w3.org/WAI/

## Conclusiones y aprendizajes

- La FASE‑I se centró en la construcción de una interfaz modular, responsiva y en la aplicación de patrones de navegación segura (rutas privadas). El equipo aprendió a gestionar estados con Context, a estructurar un proyecto React con TypeScript y a integrar componentes de Bootstrap para UI.
- Pendientes para siguientes fases: integrar un backend para autenticación, añadir la encuesta requerida y mejorar la experiencia multimedia.

## Instrucciones para empaquetar y entregar (xx_App.zip)

1. Ejecutar `npm run build` para generar la carpeta `dist`.
2. Crear una carpeta con el nombre `02_App` y dentro copiar:
    - La carpeta `cafe-react` completa **sin** `node_modules`.
    - El archivo `02_aplicativo.pdf` (documento con portada, estructura del disco, capturas y anexos).
    - Un `Readme.txt` corto que contenga los pasos mínimos para correr la app.
3. Comprimir `02_App` en `02_App.zip` y subir a meiweb24 o compartir enlace.

Recomendación: incluya `dist/` si desea que el evaluador pueda ver directamente la versión construida sin ejecutar `npm install`.

## Contacto de los integrantes

- César Daniel Ávila Barbosa — correo@ejemplo.com — 25%
- Juan David Neira Meza — correo@ejemplo.com — 25%
- Nancy Liliana Sáenz Moreno — correo@ejemplo.com — 25%
- Carlos David Pimienta Rivera — correo@ejemplo.com — 25%

---
