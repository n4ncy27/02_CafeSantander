# ☕ Café Santander — FASE I

![React](https://img.shields.io/badge/React-19.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6)
![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF)
![Node.js](https://img.shields.io/badge/Node.js-20.0+-brightgreen)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---
## **Proyecto: Café Santander — FASE I**

Este repositorio contiene la aplicación web desarrollada en React + TypeScript con Vite para la entrega de la FASE‑I del proyecto.

##  **Portada**

- Nombre del aplicativo:  **Café Santander **
### **02_CafeSantander — FASE I**

### **Aplicación web: Café Santander**

Esta es la entrega de la FASE‑I del proyecto de grupo (Grupo 2). El repositorio contiene la aplicación front‑end desarrollada en React + TypeScript con Vite, la documentación de uso y las instrucciones para empaquetado y entrega.

---

## **Tabla de contenidos**

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

- React (v19)
- TypeScript 
- Vite
- React Router (v7)
- Bootstrap 5 + React-Bootstrap
- ESLint / TypeScript
- Node.js / npm

**NOTA:** Se eligió TypeScript por ser el estándar actual en desarrollo web con React, ofreciendo tipado estático, detección temprana de errores y mayor escalabilidad, lo que mejora la estabilidad y mantenibilidad de la aplicación frente a JavaScript.

## **Requisitos previos**

- Node.js v18+ (recomendado)
- npm v9+ (recomendado)
- Git
- Navegador moderno

## **Instalación y ejecución local (PowerShell) — paso a paso**

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

## **Estructura del proyecto (árbol) y descripción de carpetas**

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

## **Mecanismo de login y rutas privadas**

- Modal de login: `src/components/BootstrapLoginModal.tsx`.
- Contexto de autenticación: `src/context/AuthContext.tsx`.
- Protección de rutas: `src/components/PrivateRoute.tsx`.

Credenciales de evaluación (simulación):

- Usuario: `Admin`
- Contraseña: `1234`

Flujo resumido: al iniciar sesión con las credenciales anteriores, `AuthContext` actualiza el estado a autenticado y las rutas privadas se vuelven accesibles; `PrivateRoute` impide el acceso directo por URL cuando el usuario no está autenticado.

## **Formularios y componentes interactivos**

- Formularios: `src/pages/Contacto.tsx` usa `react-bootstrap/Form` con validación básica.
- Componentes: Carrusel, Acordeón, Collapse, Popover y Dropdown disponibles mediante `react-bootstrap`.
- Multimedia: archivos en `public/video/` y `public/audio/` con controles de reproducción.

## **Rueda catadora digital (protótipo)**

Se incluyó un prototipo de rueda catadora en la sección de Productos/Servicios para orientar la selección del café con base en preferencias sensoriales (sabor, aroma, intensidad). El componente es interactivo y sirve como base para futuras mejoras.

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

Vista previa

![Portada]<img width="1288" height="641" alt="image" src="https://github.com/user-attachments/assets/5302a61a-bd64-46ee-bc49-59adb895b0df" />

![Login modal](/imagenes/cafe/login-modal.png)

![Ruleta catadora]<img width="1199" height="550" alt="image" src="https://github.com/user-attachments/assets/169aa0f5-f68b-41b3-8867-da41196140ab" />


![Nuestra historia]<img width="1342" height="616" alt="image" src="https://github.com/user-attachments/assets/aac67934-6b6e-40e2-91a8-a7a69797a955" />


![Nuestros productos]<img width="627" height="584" alt="image" src="https://github.com/user-attachments/assets/b2c6b0fd-aa5c-4b19-b80f-a97080cdd4c1" />

## **Roadmap y próximas mejoras**

- Integrar backend para autenticación real y persistencia (BD).
- Añadir encuesta y estadísticas.
- Mejorar la rueda catadora con datos sensoriales guardados por usuario.
- Implementar más captcha  o validaciones robustas en formularios.
- mejorar el estilo css
- entre otras conforme sigamos avanzando.


## **Contacto de los integrantes**

- César Daniel Ávila Barbosa —  cesar2224642@correo.uis.edu.co  — 25%
- Juan David Neira Meza —  juan2235605@correo.uis.edu.co — 25%
- Nancy Liliana Sáenz Moreno —nancy2224510@correo.uis.edu.co — 25%
- Carlos David Pimienta Rivera — carlos2224380@correo.uis.edu.co  — 25%

---

