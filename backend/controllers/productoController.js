// ============================================
// CONTROLADOR DE PRODUCTOS
// ============================================
// REQUERIMIENTO: Gestión de catálogo de productos
// Este controlador maneja la visualización de productos disponibles
// ============================================

// Importar pool de conexiones a MySQL
const pool = require('../db/connection');

// ============================================
// OBTENER TODOS LOS PRODUCTOS
// ============================================
/**
 * Función para listar todos los productos disponibles en el catálogo
 * Ruta: GET /api/productos
 * Uso: Mostrar productos en la página principal y página de productos
 */
const obtenerProductos = async (req, res) => {
  try {
    // PASO 1: Ejecutar query para obtener todos los productos
    // SELECT * FROM productos - Obtiene todas las columnas de la tabla productos
    // await pool.query() retorna un array: [rows, fields]
    // Usamos destructuring para obtener solo las filas (rows)
    const [rows] = await pool.query('SELECT * FROM productos');
    
    // PASO 2: Responder con los productos en formato JSON
    // El frontend recibirá un array de objetos con los productos
    res.json(rows);
  } catch (err) {
    // Capturar y registrar cualquier error de base de datos
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// ============================================
// OBTENER UN PRODUCTO POR ID
// ============================================
/**
 * Función para obtener un producto específico por su ID
 * Ruta: GET /api/productos/:id
 * Uso: Mostrar detalles de un producto individual
 */
const obtenerProducto = async (req, res) => {
  try {
    // PASO 1: Extraer el ID del producto desde los parámetros de la URL
    // req.params.id viene de la ruta /api/productos/:id
    const { id } = req.params;
    
    // PASO 2: Buscar el producto por ID en la base de datos
    // SELECT * FROM productos WHERE id = ?
    // El ? es un placeholder que previene SQL injection
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    
    // VALIDACIÓN: Verificar si se encontró el producto
    if (rows.length === 0) {
      // Si no hay resultados, el producto no existe (404 = Not Found)
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // PASO 3: Responder con el producto encontrado
    // rows[0] porque solo esperamos un resultado
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// ============================================
// EXPORTAR FUNCIONES DEL CONTROLADOR
// ============================================
// Exportar las funciones para usarlas en las rutas
module.exports = {
  obtenerProductos,  // GET /api/productos - Listar todos
  obtenerProducto    // GET /api/productos/:id - Obtener uno
};