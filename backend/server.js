// ============================================
// SERVER.JS - SERVIDOR PRINCIPAL DEL BACKEND
// ============================================
// Este archivo es el punto de entrada del servidor Express
// Configura todos los middlewares, rutas y conexiones necesarias

// Importar dependencias principales
const express = require('express'); // Framework web para Node.js
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
require('dotenv').config(); // Cargar variables de entorno desde archivo .env

// Importar todas las rutas de la aplicación
const productosRoutes = require('./routes/productos'); // Rutas para gestión de productos
const authRoutes = require('./routes/auth'); // Rutas para autenticación (login, registro, recuperación)
const carritoRoutes = require('./routes/carrito'); // Rutas para gestión del carrito de compras
const adminRoutes = require('./routes/admin'); // Rutas administrativas (CRUD completo)
const archivosRoutes = require('./routes/archivos'); // Rutas para subida de archivos/imágenes
const pool = require('./db/connection'); // Pool de conexiones a MySQL

// Inicializar aplicación Express
const app = express();
const path = require('path'); // Módulo para manejar rutas de archivos

// ============================================
// CONFIGURACIÓN DE CORS
// ============================================
// REQUERIMIENTO: Permitir comunicación entre frontend y backend
// CORS (Cross-Origin Resource Sharing) permite que el frontend en un puerto
// diferente (5173) pueda hacer peticiones al backend (5000)

const corsOptions = {
  // Orígenes permitidos - múltiples puertos para desarrollo
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
  credentials: true, // Permitir envío de cookies y headers de autenticación
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos en las peticiones
};

// ============================================
// MIDDLEWARES GLOBALES
// ============================================
// Los middlewares se ejecutan en orden para cada petición

app.use(cors(corsOptions)); // Habilitar CORS con la configuración definida
app.use(express.json()); // Parsear el body de las peticiones como JSON

// ============================================
// SERVIR ARCHIVOS ESTÁTICOS
// ============================================
// REQUERIMIENTO: Manejo de archivos multimedia
// Servir imágenes, videos y audio desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*'); // Permitir acceso desde cualquier origen
    res.set('Cache-Control', 'public, max-age=3600'); // Cachear archivos por 1 hora
  }
}));

// Servir imágenes directamente desde /imagenes (para compatibilidad con la BD)
app.use('/imagenes', express.static(path.join(__dirname, 'public', 'imagenes'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'public, max-age=3600');
  }
}));

// ============================================
// RUTAS DE PRUEBA
// ============================================
// Endpoint simple para verificar que el servidor está funcionando
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong desde backend MySQL' });
});

// ============================================
// CONFIGURACIÓN DE RUTAS DE LA API
// ============================================
// REQUERIMIENTO: Sistema completo de gestión
// Cada ruta maneja una funcionalidad específica del sistema

app.use('/api/productos', productosRoutes); // GET /api/productos - Listar productos disponibles
app.use('/api/auth', authRoutes); // POST /api/auth/login, /register, /forgot-password
app.use('/api/carrito', carritoRoutes); // CRUD del carrito de compras del usuario
app.use('/api/admin', adminRoutes); // CRUD completo para administradores
app.use('/api/archivos', archivosRoutes); // POST /api/archivos/upload - Subir imágenes

// ============================================
// MANEJO DE ERRORES 404
// ============================================
// Capturar todas las rutas que no existen
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ============================================
// VERIFICACIÓN DE CONEXIÓN A BASE DE DATOS
// ============================================
// REQUERIMIENTO: Conexión a base de datos MySQL
// Función asíncrona que verifica la conectividad con MySQL al iniciar el servidor
const verificarConexionDB = async () => {
  try {
    // Intentar obtener una conexión del pool
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL OK');
    connection.release(); // Liberar la conexión de vuelta al pool
  } catch (err) {
    // Si falla, mostrar mensaje de error con instrucciones
    console.error('❌ No se pudo conectar a MySQL:', err.message);
    console.log('💡 Verifica que:');
    console.log('   1. XAMPP MySQL esté ejecutándose');
    console.log('   2. La base de datos cafeDB exista');
    console.log('   3. Las credenciales en .env sean correctas');
  }
};

// ============================================
// INICIAR SERVIDOR
// ============================================
// Obtener puerto desde variable de entorno o usar 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor Express en el puerto especificado
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en puerto ${PORT}`);
  verificarConexionDB(); // Verificar conexión a BD al iniciar
});

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================
// Estos manejadores capturan errores no controlados para evitar que el servidor crashee

// Capturar promesas rechazadas que no fueron manejadas
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado (Promise rejection):', err.message);
  process.exit(1); // Salir con código de error
});

// Capturar excepciones no controladas
process.on('uncaughtException', (err) => {
  console.error('❌ Error no capturado (Exception):', err.message);
  process.exit(1);
});

// Capturar errores del servidor Express
server.on('error', (err) => {
  console.error('❌ Error del servidor:', err.message);
  process.exit(1);
});