// server.js - CafeSantander Backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');
const carritoRoutes = require('./routes/carrito');
const pool = require('./db/connection');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong desde backend MySQL' });
});

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carrito', carritoRoutes);

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Verificar conexión a la base de datos
const verificarConexionDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL OK');
    connection.release();
  } catch (err) {
    console.error('❌ No se pudo conectar a MySQL:', err.message);
    console.log('💡 Verifica que:');
    console.log('   1. XAMPP MySQL esté ejecutándose');
    console.log('   2. La base de datos cafeDB exista');
    console.log('   3. Las credenciales en .env sean correctas');
  }
};

// Iniciar servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en puerto ${PORT}`);
  verificarConexionDB();
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado (Promise rejection):', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Error no capturado (Exception):', err.message);
  process.exit(1);
});

// Manejo de errores del servidor
server.on('error', (err) => {
  console.error('❌ Error del servidor:', err.message);
  process.exit(1);
});