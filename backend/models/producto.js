// ============================================
// MODELS/PRODUCTO.JS - MODELO DE PRODUCTO
// ============================================
// REQUERIMIENTO: Definición de estructura de datos de productos

/*
  MODELO LIGERO SIN ORM
  =====================
  Este proyecto NO utiliza un ORM (como Sequelize o TypeORM)
  Solo define la estructura para referencia en controladores
  
  Las consultas SQL se hacen directamente con mysql2
  Ventajas: Mayor control, mejor rendimiento, menor complejidad
  
  CAMPOS DE LA TABLA 'productos':
  - id: INT AUTO_INCREMENT PRIMARY KEY
  - nombre: VARCHAR(255) - Nombre del producto
  - precio: DECIMAL(10,2) - Precio en pesos colombianos (COP)
  - disponible: TINYINT(1) - 1=disponible, 0=no disponible
  - imagen: VARCHAR(500) - Ruta de la imagen del producto
  - created_at: TIMESTAMP - Fecha de creación
*/
module.exports = {
  tableName: 'productos',
  fields: ['id','nombre','precio','disponible']
};
