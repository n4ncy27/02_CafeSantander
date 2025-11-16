# 🚀 Guía de Instalación - Café Santander

Esta guía te ayudará a configurar el proyecto después de clonarlo desde GitHub.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **XAMPP** con MySQL (o cualquier servidor MySQL) - [Descargar](https://www.apachefriends.org/)
- **Git** - [Descargar](https://git-scm.com/)

## 🔧 Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/n4ncy27/02_CafeSantander.git
cd 02_CafeSantander
```

### 2. Configurar la Base de Datos

#### a) Iniciar MySQL en XAMPP
1. Abre XAMPP Control Panel
2. Inicia el servicio **MySQL** (botón "Start")
3. Verifica que esté corriendo en el puerto **3306**

#### b) Crear la Base de Datos
1. Abre phpMyAdmin: http://localhost/phpmyadmin
2. Ve a la pestaña **SQL**
3. Copia todo el contenido del archivo `backend/db/schema.sql`
4. Pega y ejecuta el SQL
5. Verifica que se creó la base de datos `cafeDB` con las tablas: `productos`, `usuarios`, `carritos`, `carrito_items`

#### c) Actualizar Rutas de Imágenes (IMPORTANTE)
```bash
cd backend
node actualizar_imagenes.js
```

### 3. Configurar el Backend

#### a) Instalar Dependencias
```bash
cd backend
npm install
```

#### b) Configurar Variables de Entorno
1. Copia el archivo de ejemplo:
   ```bash
   copy .env.example .env
   ```
   
2. Abre `.env` y configura tus credenciales de MySQL:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=cafeDB
   JWT_SECRET=tu_clave_secreta_super_segura_aqui_123456
   ```
   
   **Nota**: Si tu MySQL tiene contraseña, actualiza `DB_PASSWORD`

#### c) Iniciar el Servidor Backend
```bash
npm start
```

Deberías ver:
```
🚀 Backend escuchando en puerto 5000
✅ Conexión a MySQL OK
```

### 4. Configurar el Frontend

#### a) Instalar Dependencias
```bash
cd frontend/cafe-react
npm install
```

#### b) Iniciar el Servidor de Desarrollo
```bash
npm run dev
```

Deberías ver:
```
VITE ready in XXX ms

➜  Local:   http://localhost:5174/
```

### 5. Verificar la Instalación

1. Abre tu navegador en: **http://localhost:5174**
2. Deberías ver:
   - ✅ Página de inicio con productos
   - ✅ Imágenes de productos cargando correctamente
   - ✅ Carrito funcionando (sin necesidad de login)
   - ✅ Precios en formato colombiano ($7.000 COP)

## 🐛 Solución de Problemas Comunes

### ❌ Error: "Cannot connect to MySQL"
- Verifica que XAMPP MySQL esté corriendo
- Revisa que las credenciales en `.env` sean correctas
- Confirma que la base de datos `cafeDB` exista

### ❌ Las imágenes no cargan
1. Verifica que ejecutaste `node actualizar_imagenes.js`
2. Reinicia el backend (`npm start`)
3. Limpia la caché del navegador (Ctrl + Shift + R)

### ❌ El carrito no funciona
- El carrito funciona SIN necesidad de login usando localStorage
- Si el problema persiste, abre la consola del navegador (F12) y busca errores

### ❌ Error: "Port 5173 is in use"
- Vite automáticamente cambiará al puerto 5174 o 5175
- Esto es normal y no afecta el funcionamiento

### ❌ Los productos no se muestran
1. Abre http://localhost:5000/api/productos
2. Deberías ver un JSON con 56 productos
3. Si no, verifica que la base de datos tenga datos

## 📁 Estructura del Proyecto

```
02_CafeSantander/
├── backend/                    # API del servidor
│   ├── controllers/           # Lógica de negocio
│   ├── db/                    # Conexión y esquemas SQL
│   ├── middleware/            # Autenticación JWT
│   ├── models/                # Modelos de datos
│   ├── public/                # Archivos estáticos (imágenes)
│   │   └── imagenes/         # ⚠️ IMPORTANTE: Contiene todas las imágenes
│   ├── routes/                # Endpoints de la API
│   ├── .env                   # Variables de entorno (CREAR)
│   └── server.js              # Punto de entrada
│
└── frontend/cafe-react/       # Aplicación React
    ├── public/                # Assets públicos
    ├── src/
    │   ├── components/        # Componentes reutilizables
    │   ├── context/           # Contexto de autenticación
    │   ├── hooks/             # Custom hooks (useCart)
    │   ├── pages/             # Páginas de la aplicación
    │   ├── services/          # Servicios API
    │   └── styles/            # Hojas de estilo CSS
    └── vite.config.js         # Configuración de Vite
```

## 🎯 Características del Proyecto

- ✅ **Catálogo de Productos**: 56 productos de café con imágenes
- ✅ **Carrito de Compras**: Funciona CON y SIN autenticación
- ✅ **Autenticación JWT**: Login/Registro de usuarios
- ✅ **Ruleta Catadora**: Selector interactivo de sabores
- ✅ **Responsive Design**: Compatible con móviles y desktop
- ✅ **Precios en COP**: Formato colombiano ($7.000)

## 👥 Credenciales de Prueba

### Usuario de Prueba
- **Email**: `prueba@cafe.com`
- **Password**: `123456`

### Base de Datos MySQL (Profesor)
- **Usuario**: `un_usr`
- **Contraseña**: `una_clave`
- **Base de Datos**: `cafeDB`

## 📞 Soporte

Si tienes problemas durante la instalación:

1. Verifica que todos los requisitos previos estén instalados
2. Revisa los logs del backend y frontend en la consola
3. Abre la consola del navegador (F12) para ver errores de JavaScript
4. Contacta al equipo de desarrollo

## 🎓 Notas para el Profesor

- El proyecto utiliza **MySQL 8.0** con el esquema incluido en `backend/db/schema.sql`
- Las credenciales de BD para evaluación están en el archivo SQL
- El backend corre en **puerto 5000** y el frontend en **puerto 5174**
- **IMPORTANTE**: Ejecutar `node actualizar_imagenes.js` después de crear la BD

---

**Última actualización**: Noviembre 2025  
**Versión**: 2.0
