// ============================================
// ADMINCONTROLLER.JS - CONTROLADOR DE ADMINISTRACIÓN
// ============================================
// REQUERIMIENTO: Sistema CRUD completo para panel administrativo
// Implementa todas las operaciones CRUD para:
// - Productos (crear, leer, actualizar, eliminar, buscar)
// - Usuarios (leer, actualizar, eliminar, buscar)
// - Estadísticas del sistema

const pool = require('../db/connection');

// ============================================
// CRUD PRODUCTOS
// ============================================

// Listar todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [productos] = await connection.query('SELECT * FROM productos ORDER BY nombre ASC');
    connection.release();
    
    res.json({
      success: true,
      data: productos,
      total: productos.length
    });
  } catch (err) {
    console.error('Error al listar productos:', err);
    res.status(500).json({
      success: false,
      error: 'Error al listar productos: ' + err.message
    });
  }
};

// Crear nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const { nombre, precio, disponible, imagen } = req.body;

    // Validar datos
    if (!nombre || !precio) {
      return res.status(400).json({
        success: false,
        error: 'El nombre y precio son requeridos'
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO productos (nombre, precio, disponible, imagen) VALUES (?, ?, ?, ?)',
      [nombre, parseFloat(precio), disponible ? 1 : 0, imagen || null]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      id: result.insertId
    });
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).json({
      success: false,
      error: 'Error al crear producto: ' + err.message
    });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [productos] = await connection.query('SELECT * FROM productos WHERE id = ?', [id]);
    connection.release();

    if (productos.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: productos[0]
    });
  } catch (err) {
    console.error('Error al obtener producto:', err);
    res.status(500).json({
      success: false,
      error: 'Error al obtener producto: ' + err.message
    });
  }
};

// Actualizar producto
exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, disponible, imagen } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({
        success: false,
        error: 'El nombre y precio son requeridos'
      });
    }

    const connection = await pool.getConnection();
    
    // Verificar que el producto existe
    const [existe] = await connection.query('SELECT id FROM productos WHERE id = ?', [id]);
    if (existe.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    await connection.query(
      'UPDATE productos SET nombre = ?, precio = ?, disponible = ?, imagen = ? WHERE id = ?',
      [nombre, parseFloat(precio), disponible ? 1 : 0, imagen || null, id]
    );
    connection.release();

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar producto: ' + err.message
    });
  }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    // Verificar que el producto existe
    const [existe] = await connection.query('SELECT id FROM productos WHERE id = ?', [id]);
    if (existe.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    await connection.query('DELETE FROM productos WHERE id = ?', [id]);
    connection.release();

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar producto: ' + err.message
    });
  }
};

// Buscar productos por nombre
exports.searchProductos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Parámetro de búsqueda requerido'
      });
    }

    const connection = await pool.getConnection();
    const [productos] = await connection.query(
      'SELECT * FROM productos WHERE nombre LIKE ? ORDER BY nombre ASC',
      [`%${query}%`]
    );
    connection.release();

    res.json({
      success: true,
      data: productos,
      total: productos.length
    });
  } catch (err) {
    console.error('Error al buscar productos:', err);
    res.status(500).json({
      success: false,
      error: 'Error al buscar productos: ' + err.message
    });
  }
};

// ============================================
// CRUD USUARIOS
// ============================================

// Listar todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [usuarios] = await connection.query(
      'SELECT id, email, nombre, apellido, telefono, direccion, created_at FROM usuarios ORDER BY created_at DESC'
    );
    connection.release();

    res.json({
      success: true,
      data: usuarios,
      total: usuarios.length
    });
  } catch (err) {
    console.error('Error al listar usuarios:', err);
    res.status(500).json({
      success: false,
      error: 'Error al listar usuarios: ' + err.message
    });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [usuarios] = await connection.query(
      'SELECT id, email, nombre, apellido, telefono, direccion, created_at FROM usuarios WHERE id = ?',
      [id]
    );
    connection.release();

    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuarios[0]
    });
  } catch (err) {
    console.error('Error al obtener usuario:', err);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuario: ' + err.message
    });
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, nombre, apellido, telefono, direccion } = req.body;

    const connection = await pool.getConnection();
    
    // Verificar que el usuario existe
    const [existe] = await connection.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (existe.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    await connection.query(
      'UPDATE usuarios SET email = ?, nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE id = ?',
      [email, nombre, apellido, telefono || null, direccion || null, id]
    );
    connection.release();

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar usuario: ' + err.message
    });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    // Verificar que el usuario existe
    const [existe] = await connection.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (existe.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Eliminar usuario (los carritos se eliminan en cascada)
    await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
    connection.release();

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar usuario: ' + err.message
    });
  }
};

// Buscar usuarios por email o nombre
exports.searchUsuarios = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Parámetro de búsqueda requerido'
      });
    }

    const connection = await pool.getConnection();
    const [usuarios] = await connection.query(
      'SELECT id, email, nombre, apellido, telefono, direccion, created_at FROM usuarios WHERE email LIKE ? OR nombre LIKE ? OR apellido LIKE ? ORDER BY nombre ASC',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    connection.release();

    res.json({
      success: true,
      data: usuarios,
      total: usuarios.length
    });
  } catch (err) {
    console.error('Error al buscar usuarios:', err);
    res.status(500).json({
      success: false,
      error: 'Error al buscar usuarios: ' + err.message
    });
  }
};

// Obtener estadísticas del sistema
exports.getStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [totalProductos] = await connection.query('SELECT COUNT(*) as count FROM productos');
    const [totalUsuarios] = await connection.query('SELECT COUNT(*) as count FROM usuarios');
    const [carritosPendientes] = await connection.query(
      'SELECT COUNT(*) as count FROM carritos WHERE estado = "activo"'
    );

    connection.release();

    res.json({
      success: true,
      stats: {
        totalProductos: totalProductos[0].count,
        totalUsuarios: totalUsuarios[0].count,
        carritosPendientes: carritosPendientes[0].count
      }
    });
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas: ' + err.message
    });
  }
};
