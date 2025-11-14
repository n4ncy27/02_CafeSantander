const pool = require('../db/connection');

const carritoController = {
  // Obtener o crear carrito del usuario y obtener todos los items
  obtenerCarrito: async (req, res) => {
    try {
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
  }
};

module.exports = carritoController;
