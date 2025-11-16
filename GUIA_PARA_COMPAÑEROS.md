# 📋 GUÍA COMPLETA PARA CLONAR Y EJECUTAR EL PROYECTO

## **PASO 1: Clonar el repositorio**
```
git clone https://github.com/n4ncy27/02_CafeSantander.git
cd 02_CafeSantander
```

---

## **PASO 2: Preparar la base de datos MySQL**

1. **Abre XAMPP Control Panel**
2. **Haz clic en "Start" en MySQL** (espera a que diga "Running" en verde)
3. **Abre phpMyAdmin** (o accede a `http://localhost/phpmyadmin`)
4. **Copia todo el contenido de este archivo:**
   ```
   backend/db/schema.sql
   ```
5. **En phpMyAdmin:**
   - Haz clic en la pestaña **"SQL"**
   - Pega el contenido del `schema.sql`
   - Haz clic en **"Ejecutar"**
   - Espera a que termine (verás mensajes de éxito)

**Resultado esperado:** Base de datos `cafeDB` creada con 56 productos y 1 usuario de prueba.

---

## **PASO 3: Instalar y arrancar el BACKEND**

Abre **PowerShell** y ejecuta:

```powershell
cd 02_CafeSantander\backend
npm install
npm start
```

**Resultado esperado:**
```
🚀 Backend escuchando en puerto 5000
✅ Conexión a MySQL OK
```

**Nota:** Déjalo corriendo en esta ventana. No la cierres.

---

## **PASO 4: Instalar y arrancar el FRONTEND**

Abre **OTRA ventana de PowerShell** y ejecuta:

```powershell
cd 02_CafeSantander\frontend\cafe-react
npm install
npm run dev
```

**Resultado esperado:**
```
VITE v7.2.2 ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## **PASO 5: Abrir la página en el navegador**

1. **Abre tu navegador** (Chrome, Firefox, Edge, etc.)
2. **Ve a:** `http://localhost:5173`
3. **Deberías ver:**
   - ✅ Logo de CaféSantander
   - ✅ Sección "Nuestros Productos" con 56 cafés
   - ✅ Imágenes cargadas correctamente
   - ✅ Botón "Añadir al carrito" funcional

---

## **PASO 6: Probar la funcionalidad completa**

### **Ver productos (sin login):**
- Haz scroll hasta "Nuestros Productos"
- Verás todas las variedades de café
- Puedes hacer clic en "Añadir al carrito"

### **Login (opcional):**
- Haz clic en **"Iniciar Sesión"** (arriba a la derecha)
- **Email:** `un_usr@gmail.com`
- **Contraseña:** `una_clave`
- Haz clic en **"Entrar"**

### **Ver carrito:**
- Si iniciaste sesión, verás el carrito en la parte inferior derecha
- Puedes ir a **"Carrito"** para ver todos tus productos
- O haz clic en el **"Carrito"** en el menú superior

---

## 🔧 **RESOLUCIÓN DE PROBLEMAS**

### ❌ "No se pudieron cargar los productos"
**Solución:** El backend no está corriendo
- Verifica que MySQL esté activo (XAMPP)
- Verifica que en la ventana del backend veas "🚀 Backend escuchando en puerto 5000"
- Recarga la página del navegador (F5)

### ❌ "Imágenes rotas"
**Solución:** Las imágenes ya tienen un placeholder automático
- Las imágenes que no existan mostrarán una imagen de café por defecto
- Esto es normal y funciona en cualquier equipo

### ❌ "Puerto 5173 ya está en uso"
**Solución:** Cubre otro puerto
- Vite automáticamente usa `5174`, `5175`, etc.
- Solo sigue el mensaje que te dice: `Local: http://localhost:5174/`

### ❌ "npm install falla"
**Solución:**
```powershell
npm cache clean --force
npm install
```

---

## 📝 **RESUMEN RÁPIDO (30 segundos)**

```
1. git clone https://github.com/n4ncy27/02_CafeSantander.git
2. XAMPP: MySQL START
3. phpMyAdmin: Cargar schema.sql
4. PowerShell 1: cd backend; npm install; npm start
5. PowerShell 2: cd frontend/cafe-react; npm install; npm run dev
6. Navegador: http://localhost:5173
7. ¡Listo!
```

---

## ✅ **CHECKLIST FINAL**

- [ ] MySQL corriendo (XAMPP)
- [ ] Base de datos `cafeDB` creada
- [ ] Backend escuchando en puerto 5000
- [ ] Frontend corriendo en puerto 5173
- [ ] Navegador abierto en `http://localhost:5173`
- [ ] Sección "Nuestros Productos" visible
- [ ] 56 productos con imágenes
- [ ] Botón "Añadir al carrito" funcional

---

## 📧 **¿Preguntas o problemas?**

Si hay algún problema que no se resuelva con esta guía, contacta al equipo de desarrollo.

**¡A disfrutar del proyecto! 🚀**
