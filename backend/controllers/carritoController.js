// ============================================
// CONTROLADOR DEL CARRITO DE COMPRAS
// ============================================
// REQUERIMIENTO: Sistema de carrito de compras funcional
// ⭐ REQUERIMIENTO CRUD COMPLETO: Create, Read, Update, Delete
// Este controlador maneja todas las operaciones del carrito:
// - Obtener carrito del usuario (Read)
// - Agregar productos (Create)
// - Actualizar cantidades (Update)
// - Eliminar productos (Delete)
// - Funciones administrativas para gestionar todos los carritos
// ============================================

// Importar pool de conexiones a MySQL
const pool = require('../db/connection');

// ============================================
// OBJETO CONTROLADOR CON TODAS LAS FUNCIONES
// ============================================
const carritoController = {
  
  // ==========================================
  // OBTENER CARRITO DEL USUARIO - READ
  // ==========================================
  // REQUERIMIENTO: Mostrar productos en el carrito del usuario autenticado
  // Ruta: GET /api/carrito
  // Autenticación: Requiere token JWT (req.user viene del middleware auth.js)
  obtenerCarrito: async (req, res) => {
    try {
      // PASO 1: Obtener ID del usuario desde el token JWT
      // req.user es agregado por el middleware de autenticación
      const userId = req.user.id;
      const connection = await pool.getConnection();
      
      // Obtener o crear carrito activo del usuario
      let [carrito] = await connection.query(
        'SELECT id FROM carritos WHERE usuario_id = ? AND estado = "activo"',
        [userId]
      );

      let carritoId;
      if (carrito.length === 0) {
        // Crear nuevo carrito
        const [result] = await connection.query(
          'INSERT INTO carritos (usuario_id, estado) VALUES (?, "activo")',
          [userId]
        );
        carritoId = result.insertId;
      } else {
        carritoId = carrito[0].id;
      }

      // Obtener items del carrito con información del producto
      const [items] = await connection.query(
        `SELECT 
          ci.id, 
          ci.producto_id, 
          ci.cantidad, 
          ci.precio,
          p.nombre,
          p.imagen
        FROM carrito_items ci
        JOIN productos p ON ci.producto_id = p.id
        WHERE ci.carrito_id = ?`,
        [carritoId]
      );
      
      connection.release();
      res.json({ 
        carritoId,
        items,
        total: items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
      });
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      res.status(500).json({ error: 'Error al obtener carrito' });
    }
  },

  // Agregar producto al carrito
  agregarAlCarrito: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      if (!productId || !quantity) {
        return res.status(400).json({ error: 'Producto y cantidad son requeridos' });
      }

      const connection = await pool.getConnection();
      
      // Obtener o crear carrito
      let [carrito] = await connection.query(
        'SELECT id FROM carritos WHERE usuario_id = ? AND estado = "activo"',
        [userId]
      );

      let carritoId;
      if (carrito.length === 0) {
        const [result] = await connection.query(
          'INSERT INTO carritos (usuario_id, estado) VALUES (?, "activo")',
          [userId]
        );
        carritoId = result.insertId;
      } else {
        carritoId = carrito[0].id;
      }

      // Obtener precio del producto
      const [producto] = await connection.query(
        'SELECT precio FROM productos WHERE id = ?',
        [productId]
      );

      if (producto.length === 0) {
        connection.release();
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Verificar si el producto ya existe en el carrito
      const [existing] = await connection.query(
        'SELECT id FROM carrito_items WHERE carrito_id = ? AND producto_id = ?',
        [carritoId, productId]
      );

      if (existing.length > 0) {
        // Actualizar cantidad
        await connection.query(
          'UPDATE carrito_items SET cantidad = cantidad + ? WHERE carrito_id = ? AND producto_id = ?',
          [quantity, carritoId, productId]
        );
      } else {
        // Insertar nuevo item
        await connection.query(
          'INSERT INTO carrito_items (carrito_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
          [carritoId, productId, quantity, producto[0].precio]
        );
      }

      connection.release();
      res.json({ message: 'Producto agregado al carrito', carritoId });
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      res.status(500).json({ error: 'Error al agregar al carrito' });
    }
  },

  // Actualizar cantidad en carrito
  actualizarCarrito: async (req, res) => {
    try {
      const { quantity } = req.body;
      const { itemId } = req.params;
      const userId = req.user.id;

      if (!quantity) {
        return res.status(400).json({ error: 'Cantidad es requerida' });
      }

      const connection = await pool.getConnection();
      
      // Verificar que el item pertenece al carrito del usuario
      const [item] = await connection.query(
        `SELECT ci.id FROM carrito_items ci
         JOIN carritos c ON ci.carrito_id = c.id
         WHERE ci.id = ? AND c.usuario_id = ?`,
        [itemId, userId]
      );

      if (item.length === 0) {
        connection.release();
        return res.status(403).json({ error: 'No autorizado' });
      }

      await connection.query(
        'UPDATE carrito_items SET cantidad = ? WHERE id = ?',
        [quantity, itemId]
      );
      connection.release();

      res.json({ message: 'Carrito actualizado' });
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
      res.status(500).json({ error: 'Error al actualizar carrito' });
    }
  },

  // Eliminar producto del carrito
  eliminarDelCarrito: async (req, res) => {
    try {
      const { itemId } = req.params;
      const userId = req.user.id;

      const connection = await pool.getConnection();
      
      // Verificar que el item pertenece al carrito del usuario
      const [item] = await connection.query(
        `SELECT ci.id FROM carrito_items ci
         JOIN carritos c ON ci.carrito_id = c.id
         WHERE ci.id = ? AND c.usuario_id = ?`,
        [itemId, userId]
      );

      if (item.length === 0) {
        connection.release();
        return res.status(403).json({ error: 'No autorizado' });
      }

      await connection.query(
        'DELETE FROM carrito_items WHERE id = ?',
        [itemId]
      );
      connection.release();

      res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      res.status(500).json({ error: 'Error al eliminar del carrito' });
    }
  },

  // Vaciar carrito
  vaciarCarrito: async (req, res) => {
    try {
      const userId = req.user.id;
      const connection = await pool.getConnection();
      
      // Obtener carrito activo del usuario
      const [carrito] = await connection.query(
        'SELECT id FROM carritos WHERE usuario_id = ? AND estado = "activo"',
        [userId]
      );

      if (carrito.length > 0) {
        await connection.query(
          'DELETE FROM carrito_items WHERE carrito_id = ?',
          [carrito[0].id]
        );
      }

      connection.release();
      res.json({ message: 'Carrito vaciado' });
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      res.status(500).json({ error: 'Error al vaciar carrito' });
    }
  },

  // CRUD COMPLETO - Funciones administrativas

  // Listar todos los carritos (para admin)
  listarTodosLosCarritos: async (req, res) => {
    try {
      const connection = await pool.getConnection();
      
      const [carritos] = await connection.query(
        `SELECT 
          c.id,
          c.usuario_id,
          c.estado,
          c.created_at,
          u.nombre as usuario_nombre,
          u.email as usuario_email,
          COUNT(ci.id) as total_items,
          COALESCE(SUM(ci.cantidad * ci.precio), 0) as total_precio
        FROM carritos c
        LEFT JOIN usuarios u ON c.usuario_id = u.id
        LEFT JOIN carrito_items ci ON c.id = ci.carrito_id
        GROUP BY c.id, c.usuario_id, c.estado, c.created_at, u.nombre, u.email
        ORDER BY c.created_at DESC`
      );

      connection.release();
      res.json({ 
        success: true,
        data: carritos,
        total: carritos.length
      });
    } catch (error) {
      console.error('Error al listar carritos:', error);
      res.status(500).json({ error: 'Error al listar carritos' });
    }
  },

  // Obtener carrito por ID (para admin)
  obtenerCarritoPorId: async (req, res) => {
    try {
      const { carritoId } = req.params;
      const connection = await pool.getConnection();
      
      // Obtener información del carrito
      const [carrito] = await connection.query(
        `SELECT 
          c.id,
          c.usuario_id,
          c.estado,
          c.created_at,
          u.nombre as usuario_nombre,
          u.email as usuario_email
        FROM carritos c
        LEFT JOIN usuarios u ON c.usuario_id = u.id
        WHERE c.id = ?`,
        [carritoId]
      );

      if (carrito.length === 0) {
        connection.release();
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      // Obtener items del carrito
      const [items] = await connection.query(
        `SELECT 
          ci.id,
          ci.producto_id,
          ci.cantidad,
          ci.precio,
          p.nombre as producto_nombre,
          p.imagen as producto_imagen
        FROM carrito_items ci
        JOIN productos p ON ci.producto_id = p.id
        WHERE ci.carrito_id = ?`,
        [carritoId]
      );

      connection.release();
      res.json({
        success: true,
        data: {
          ...carrito[0],
          items,
          total: items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
        }
      });
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      res.status(500).json({ error: 'Error al obtener carrito' });
    }
  },

  // Eliminar carrito completo (para admin)
  eliminarCarrito: async (req, res) => {
    try {
      const { carritoId } = req.params;
      const connection = await pool.getConnection();
      
      // Verificar que el carrito existe
      const [existe] = await connection.query(
        'SELECT id FROM carritos WHERE id = ?',
        [carritoId]
      );

      if (existe.length === 0) {
        connection.release();
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      // Eliminar items del carrito primero (por foreign key)
      await connection.query(
        'DELETE FROM carrito_items WHERE carrito_id = ?',
        [carritoId]
      );

      // Eliminar el carrito
      await connection.query(
        'DELETE FROM carritos WHERE id = ?',
        [carritoId]
      );

      connection.release();
      res.json({ 
        success: true,
        message: 'Carrito eliminado exitosamente' 
      });
    } catch (error) {
      console.error('Error al eliminar carrito:', error);
      res.status(500).json({ error: 'Error al eliminar carrito' });
    }
  }
};

module.exports = carritoController;
