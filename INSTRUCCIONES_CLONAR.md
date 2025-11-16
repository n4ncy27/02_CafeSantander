# 🚀 Instrucciones para Clonar y Ejecutar el Proyecto

## 📋 Requisitos Previos
- **Node.js** 18+ instalado
- **XAMPP** con MySQL corriendo
- **Git** instalado

## 🔧 Pasos de Instalación

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/n4ncy27/02_CafeSantander.git
cd 02_CafeSantander
```

### 2️⃣ Configurar la Base de Datos
1. Abre **XAMPP** y arranca **MySQL**
2. Abre **phpMyAdmin**: http://localhost/phpmyadmin
3. Ve a **SQL** y ejecuta todo el contenido de `backend/db/schema.sql`
4. Verifica que se creó la base de datos `cafeDB` con 56 productos

### 3️⃣ Configurar Backend
```bash
cd backend
npm install
```

Crea el archivo `.env` con este contenido:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=cafeDB
JWT_SECRET=mi_clave_secreta_super_segura_2024
```

Inicia el backend:
```bash
npm start
```

Deberías ver:
```
🚀 Backend escuchando en puerto 5000
✅ Conexión a MySQL OK
```

### 4️⃣ Configurar Frontend
**En otra terminal:**
```bash
cd frontend/cafe-react
npm install
npm run dev
```

Deberías ver:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 5️⃣ Abrir la Aplicación
Abre tu navegador en: **http://localhost:5173**

## ✅ Verificación

Si todo está bien, deberías ver:
- ✅ 56 productos con imágenes
- ✅ Carrito funcionando (sin login)
- ✅ Ruleta catadora interactiva
- ✅ Precios en formato colombiano ($7.000 COP)

## 🐛 Solución de Problemas

### ❌ "No se pudieron cargar los productos"
**Solución:** Verifica que el backend esté corriendo en puerto 5000
```bash
# En la carpeta backend:
npm start
```

### ❌ "Error de conexión a MySQL"
**Solución:** 
1. Verifica que XAMPP MySQL esté corriendo
2. Revisa las credenciales en `.env`
3. Verifica que existe la base de datos `cafeDB`

### ❌ "Las imágenes no cargan"
**Solución:** Las imágenes ya están en el repositorio en:
- `backend/public/imagenes/` (108 archivos)
- Reinicia el backend después de clonar

### ❌ "El carrito no funciona"
**Solución:** El carrito funciona SIN necesidad de login usando localStorage.
Solo refresca la página (Ctrl + Shift + R)

## 📦 Archivos Importantes Incluidos

El repositorio **YA INCLUYE**:
- ✅ `package-lock.json` (backend y frontend)
- ✅ 108 imágenes de productos en `backend/public/imagenes/`
- ✅ 108 imágenes en `frontend/cafe-react/public/imagenes/`
- ✅ Base de datos SQL con 56 productos

## 👥 Credenciales de Prueba

**Usuario de prueba:**
- Email: `un_usr@gmail.com`
- Contraseña: `una_clave`

## 🎯 Estructura del Proyecto

```
02_CafeSantander/
├── backend/                    # API Express
│   ├── public/imagenes/       # ⚠️ 108 imágenes (YA incluidas)
│   ├── db/schema.sql          # Crear base de datos
│   └── package-lock.json      # ⚠️ Versionado
├── frontend/cafe-react/       # React + Vite
│   ├── public/imagenes/       # ⚠️ 108 imágenes (YA incluidas)
│   └── package-lock.json      # ⚠️ Versionado
└── package-lock.json          # ⚠️ Root (versionado)
```

## 📞 Soporte

Si tienes problemas:
1. Verifica que MySQL esté corriendo
2. Revisa que los puertos 5000 y 5173 estén libres
3. Confirma que ejecutaste `npm install` en backend Y frontend
4. Limpia caché del navegador (Ctrl + Shift + R)

---
**Última actualización:** Noviembre 2025
