// ============================================
// CONNECTION.JS - CONFIGURACIÓN DE CONEXIÓN A MYSQL
// ============================================
// REQUERIMIENTO: Conexión a base de datos MySQL
// Este archivo configura el pool de conexiones para comunicación con MySQL
// Usa variables de entorno (.env) para credenciales seguras
// ============================================

// Importar driver de MySQL con soporte de Promesas
const mysql = require('mysql2/promise');

// Cargar variables de entorno desde archivo .env
require('dotenv').config();

// ============================================
// CREAR POOL DE CONEXIONES
// ============================================
/**
 * Pool de Conexiones MySQL
 * 
 * VENTAJAS DEL POOL:
 * - Reutiliza conexiones en lugar de crear nuevas cada vez
 * - Mejora el rendimiento significativamente
 * - Gestiona automáticamente el número de conexiones simultáneas
 * - Espera si todas las conexiones están ocupadas
 * 
 * CONFIGURACIÓN:
 */
const pool = mysql.createPool({
  // ============================================
  // PARÁMETROS DE CONEXIÓN
  // ============================================
  
  // Host del servidor MySQL (localhost o 127.0.0.1 para desarrollo local)
  host: process.env.DB_HOST || '127.0.0.1',
  
  // Puerto de MySQL (3306 es el puerto por defecto)
  port: process.env.DB_PORT || 3306,
  
  // Usuario de MySQL
  // REQUERIMIENTO: Usuario 'un_usr' (definido en .env)
  user: process.env.DB_USER || 'root',
  
  // Contraseña del usuario MySQL
  // REQUERIMIENTO: Contraseña 'una_clave' (definida en .env)
  password: process.env.DB_PASSWORD || '',
  
  // Nombre de la base de datos
  // REQUERIMIENTO: Base de datos 'cafeDB'
  database: process.env.DB_NAME || 'cafeDB',
  
  // ============================================
  // CONFIGURACIÓN DEL POOL
  // ============================================
  
  // Esperar por conexiones disponibles si el pool está lleno
  waitForConnections: true,
  
  // Número máximo de conexiones simultáneas en el pool
  // 10 conexiones es suficiente para aplicaciones pequeñas/medianas
  connectionLimit: 10,
  
  // Número máximo de peticiones en cola esperando conexión
  // 0 = ilimitado (puede causar problemas de memoria en alta carga)
  queueLimit: 0
});

// ============================================
// EXPORTAR POOL
// ============================================
// El pool se usa en todos los controladores para ejecutar queries
// USO:
//   const connection = await pool.getConnection();
//   const [rows] = await connection.query('SELECT * FROM productos');
//   connection.release();
module.exports = pool;