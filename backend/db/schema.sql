-- =============================================
-- CafeSantander - Base de Datos Completa
-- =============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS cafeDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE cafeDB;

-- =============================================
-- TABLAS
-- =============================================

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) DEFAULT 0,
  disponible TINYINT(1) DEFAULT 1,
  imagen VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de carritos
CREATE TABLE IF NOT EXISTS carritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('activo', 'comprado') DEFAULT 'activo',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de items del carrito
CREATE TABLE IF NOT EXISTS carrito_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  carrito_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  precio DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- =============================================
-- DATOS DE PRODUCTOS (47 PRODUCTOS)
-- =============================================

-- Productos básicos (6 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Espresso', 7000.00, 1, '/imagenes/cafe/espresso.jpg'),
('Latte', 7000.00, 1, '/imagenes/cafe/latte.jpg'),
('Mocachino', 8000.00, 1, '/imagenes/cafe/mocachino.jpg'),
('Chocolate', 9000.00, 1, '/imagenes/cafe/chocolate.jpg'),
('Pastel de Chocolate', 15000.00, 1, '/imagenes/cafe/pastel_chocolate.jpg'),
('Galletas', 6000.00, 1, '/imagenes/cafe/galletas.jpg');

-- Productos de la ruleta AFRUTADO (18 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café con Mora', 15000.00, 1, '/imagenes/cafe/temora.jpg'),
('Café con Frambuesa', 15000.00, 1, '/imagenes/cafe/teframbuesa.jpg'),
('Café con Arándano', 15000.00, 1, '/imagenes/cafe/tearanonos.jpg'),
('Café con Fresa', 15000.00, 1, '/imagenes/cafe/tefresas.jpg'),
('Café con Pasas de Uva', 16500.00, 1, '/imagenes/cafe/teuvaspasas.jpg'),
('Café con Pasas de Ciruela', 16500.00, 1, '/imagenes/cafe/tepasasciruela.jpg'),
('Café con Coco', 18000.00, 1, '/imagenes/cafe/cafecoco.jpg'),
('Café con Cereza', 18000.00, 1, '/imagenes/cafe/cafecereza.jpg'),
('Café con Granada', 19500.00, 1, '/imagenes/cafe/cafegranada.jpg'),
('Café con Piña', 18000.00, 1, '/imagenes/cafe/cafepiña.jpg'),
('Café con Uva', 16500.00, 1, '/imagenes/cafe/cafeuva.jpg'),
('Café con Manzana', 16500.00, 1, '/imagenes/cafe/cafemanzana.jpg'),
('Café con Melocotón', 18000.00, 1, '/imagenes/cafe/cafedurazno.jpg'),
('Café con Pera', 16500.00, 1, '/imagenes/cafe/cafepera.jpg'),
('Café con Pomelo', 19500.00, 1, '/imagenes/cafe/cafepomelo.jpg'),
('Café con Naranja', 18000.00, 1, '/imagenes/cafe/cafenaranja.jpg'),
('Café con Limón', 18000.00, 1, '/imagenes/cafe/cafelimon.jpg'),
('Café con Lima', 19500.00, 1, '/imagenes/cafe/cafelima.jpg');

-- Productos de la ruleta FLORAL (3 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café con Manzanilla', 21600.00, 1, '/imagenes/cafe/temanzanilla.jpg'),
('Café con Jazmín', 23400.00, 1, '/imagenes/cafe/tejazmin.jpg'),
('Café con Rosas', 25200.00, 1, '/imagenes/cafe/terosa.jpg');

-- Productos de la ruleta DULCE (4 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café de Melaza', 18150.00, 1, '/imagenes/cafe/cafemelaza.jpg'),
('Café de Miel', 19800.00, 1, '/imagenes/cafe/cafemiel.jpg'),
('Café con Jarabe de Manzana', 21450.00, 1, '/imagenes/cafe/cafejarabemanzana.jpg'),
('Café Caramelizado', 18150.00, 1, '/imagenes/cafe/cafecaramelizado.jpg');

-- Productos de la ruleta ACIDO/FERMENTADO (10 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café con Aromáticos Ácidos', 21450.00, 1, '/imagenes/cafe/cafearomaticoacido.jpg'),
('Café con Ácido Acético', 25350.00, 1, '/imagenes/cafe/cafeacidoacetico.jpg'),
('Café con Ácido Butírico', 27300.00, 1, '/imagenes/cafe/cafeacidobutirico.jpg'),
('Café con Ácido Isovalérico', 27300.00, 1, '/imagenes/cafe/cafeacidoisovalorico.jpg'),
('Café con Ácido Cítrico', 23400.00, 1, '/imagenes/cafe/cafeacidocitrico.jpg'),
('Café con Ácido Málico', 23400.00, 1, '/imagenes/cafe/cafeacidomalico.jpg'),
('Café Vinoso', 25350.00, 1, '/imagenes/cafe/cafevinoso.jpg'),
('Café con Whisky', 27300.00, 1, '/imagenes/cafe/cafewhisky.jpg'),
('Café Fermentado', 25350.00, 1, '/imagenes/cafe/cafefermentado.jpg'),
('Café Muy Maduro', 23400.00, 1, '/imagenes/cafe/cafemuyMaduro.jpg');

-- Productos de la ruleta VERDE/VEGETAL (3 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café Poco Maduro', 12150.00, 1, '/imagenes/cafe/cafepocomaduro.jpg'),
('Café con Aroma de Peapod', 12150.00, 1, '/imagenes/cafe/cafepeapod.jpg'),
('Café Fresco', 12150.00, 1, '/imagenes/cafe/cafefresco.jpg');

-- Productos de la ruleta OTROS (2 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café Duro', 18900.00, 1, '/imagenes/cafe/cafeuro.jpg'),
('Café con Aroma a Cartón', 18900.00, 1, '/imagenes/cafe/cafecarton.jpg');

-- Productos de la ruleta TOSTADO (3 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café Tostado', 15000.00, 1, '/imagenes/cafe/cafetostado.jpg'),
('Café Acre', 15000.00, 1, '/imagenes/cafe/cafeacre.jpg'),
('Café Ceniciento', 15000.00, 1, '/imagenes/cafe/cafeceniciento.jpg');

-- Productos de la ruleta ESPECIAS (4 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café de Anís', 21600.00, 1, '/imagenes/cafe/cafeanis.jpg'),
('Café con Nuez Moscada', 21600.00, 1, '/imagenes/cafe/cafenuezmoscada.jpg'),
('Café con Canela', 21600.00, 1, '/imagenes/cafe/cafecanela.jpg'),
('Café con Clavo', 21600.00, 1, '/imagenes/cafe/cafeclavo.jpg');

-- Productos de la ruleta NUECES/CACAO (2 productos)
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Café de Cacahuate', 18150.00, 1, '/imagenes/cafe/cafecacahuate.jpg'),
('Café con Avellana', 18150.00, 1, '/imagenes/cafe/cafeavellana.jpg');

-- =============================================
-- USUARIO DE APLICACIÓN PARA EL PROFESOR
-- Usuario de prueba ya registrado en la aplicación
-- Email: un_usr@gmail.com  |  Contraseña: una_clave
-- =============================================
INSERT INTO usuarios (email, password, nombre, apellido, telefono, direccion) VALUES
('un_usr@gmail.com', '$2b$10$ibSg3SrWkuH95NrpBLntKu6qolSG2XQGO5V1QojdVYMtlIVSpmWYi', 'Usuario', 'Prueba', '3001234567', 'Dirección de prueba');

-- =============================================
-- USUARIO DE BASE DE DATOS PARA EL PROFESOR
-- Crea el usuario MySQL solicitado y le da permisos sobre cafeDB
-- Usuario: un_usr  |  Clave: una_clave
-- Nota: IF NOT EXISTS evita error si ya existe
-- =============================================
CREATE USER IF NOT EXISTS 'un_usr'@'localhost' IDENTIFIED BY 'una_clave';
GRANT ALL PRIVILEGES ON cafeDB.* TO 'un_usr'@'localhost';
FLUSH PRIVILEGES;
