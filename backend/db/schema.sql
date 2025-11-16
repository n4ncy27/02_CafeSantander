-- =============================================
-- CAFESANTANDER - ESQUEMA DE BASE DE DATOS MYSQL
-- =============================================
-- REQUERIMIENTO: Base de datos completa para el sistema
-- Este archivo SQL crea toda la estructura de la base de datos:
-- - Tablas (productos, usuarios, carritos, carrito_items)
-- - Relaciones (Foreign Keys)
-- - Datos iniciales (56 productos + usuario de prueba)
-- - Usuario MySQL para el profesor (un_usr / una_clave)
-- =============================================

-- =============================================
-- CREAR BASE DE DATOS
-- =============================================
-- Crear la base de datos si no existe
-- CHARACTER SET utf8mb4: Soporta emojis y caracteres internacionales
-- COLLATE utf8mb4_general_ci: Comparaciones case-insensitive (ñ = Ñ)
CREATE DATABASE IF NOT EXISTS cafeDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE cafeDB;

-- =============================================
-- TABLA: productos
-- =============================================
-- REQUERIMIENTO: Catálogo de productos de café
-- Almacena todos los productos disponibles en la tienda
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,          -- Identificador único del producto
  nombre VARCHAR(255) NOT NULL,               -- Nombre del producto (ej: "Espresso", "Café con Mora")
  precio DECIMAL(10,2) DEFAULT 0,             -- Precio en pesos colombianos (10 dígitos, 2 decimales)
  disponible TINYINT(1) DEFAULT 1,            -- Disponibilidad (1 = disponible, 0 = agotado)
  imagen VARCHAR(255),                        -- Ruta de la imagen del producto
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha de creación automática
);

-- =============================================
-- TABLA: usuarios
-- =============================================
-- REQUERIMIENTO: Sistema de autenticación de usuarios
-- Almacena información de usuarios registrados
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,          -- Identificador único del usuario
  email VARCHAR(255) NOT NULL UNIQUE,         -- Email (UNIQUE: no permite duplicados)
  password VARCHAR(255) NOT NULL,             -- Contraseña encriptada con bcrypt
  nombre VARCHAR(100) NOT NULL,               -- Nombre del usuario
  apellido VARCHAR(100) NOT NULL,             -- Apellido del usuario
  telefono VARCHAR(20),                       -- Teléfono (opcional)
  direccion TEXT,                             -- Dirección de envío (opcional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha de registro
);

-- =============================================
-- TABLA: carritos
-- =============================================
-- REQUERIMIENTO: Sistema de carrito de compras
-- Un usuario puede tener múltiples carritos (actual + historial de compras)
CREATE TABLE IF NOT EXISTS carritos (
  id INT AUTO_INCREMENT PRIMARY KEY,          -- Identificador único del carrito
  usuario_id INT NOT NULL,                    -- ID del usuario dueño del carrito
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
  estado ENUM('activo', 'comprado') DEFAULT 'activo',  -- Estado del carrito
  
  -- RELACIÓN: Un carrito pertenece a un usuario
  -- ON DELETE CASCADE: Si se elimina el usuario, se eliminan sus carritos
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================
-- TABLA: carrito_items
-- =============================================
-- REQUERIMIENTO: Items individuales dentro del carrito
-- Tabla de relación muchos-a-muchos entre carritos y productos
CREATE TABLE IF NOT EXISTS carrito_items (
  id INT AUTO_INCREMENT PRIMARY KEY,          -- Identificador único del item
  carrito_id INT NOT NULL,                    -- ID del carrito al que pertenece
  producto_id INT NOT NULL,                   -- ID del producto
  cantidad INT NOT NULL DEFAULT 1,            -- Cantidad de unidades
  precio DECIMAL(10,2) NOT NULL,              -- Precio al momento de agregar (puede cambiar después)
  
  -- RELACIONES:
  -- Un item pertenece a un carrito
  FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
  -- Un item está asociado a un producto
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- =============================================
-- DATOS INICIALES: PRODUCTOS
-- =============================================
-- REQUERIMIENTO: Catálogo de 56 productos de café
-- Los productos están organizados por categorías según la rueda de sabores del café

-- =============================================
-- PRODUCTOS BÁSICOS (6 productos)
-- =============================================
-- Productos clásicos de cafetería
INSERT INTO productos (nombre, precio, disponible, imagen) VALUES
('Espresso', 7000.00, 1, '/imagenes/cafe/espresso.jpg'),          -- Café expreso clásico
('Latte', 7000.00, 1, '/imagenes/cafe/latte.jpg'),                -- Café con leche
('Mocachino', 8000.00, 1, '/imagenes/cafe/mocachino.jpg'),        -- Café con chocolate
('Chocolate', 9000.00, 1, '/imagenes/cafe/chocolate.jpg'),        -- Chocolate caliente
('Pastel de Chocolate', 15000.00, 1, '/imagenes/cafe/pastel_chocolate.jpg'),  -- Repostería
('Galletas', 6000.00, 1, '/imagenes/cafe/galletas.jpg');          -- Acompañamiento

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
-- USUARIO DE APLICACIÓN DE PRUEBA
-- =============================================
-- REQUERIMIENTO: Usuario de prueba ya registrado
-- 
-- CREDENCIALES:
-- Email: un_usr@gmail.com
-- Contraseña: una_clave
-- 
-- NOTA IMPORTANTE: La contraseña está encriptada con bcrypt
-- Hash: $2b$10$ibSg3SrWkuH95NrpBLntKu6qolSG2XQGO5V1QojdVYMtlIVSpmWYi
-- Este hash corresponde a la contraseña "una_clave"
-- 
-- USO: El profesor puede usar este usuario para probar la aplicación
-- sin necesidad de registrarse
INSERT INTO usuarios (email, password, nombre, apellido, telefono, direccion) VALUES
('un_usr@gmail.com', '$2b$10$ibSg3SrWkuH95NrpBLntKu6qolSG2XQGO5V1QojdVYMtlIVSpmWYi', 'Usuario', 'Prueba', '3001234567', 'Dirección de prueba');

-- =============================================
-- USUARIO DE BASE DE DATOS MYSQL
-- =============================================
-- REQUERIMIENTO: Credenciales MySQL específicas
-- 
-- CREDENCIALES MYSQL:
-- Usuario: un_usr
-- Contraseña: una_clave
-- Base de datos: cafeDB
-- Host: localhost
-- Puerto: 3306
-- 
-- PERMISOS: El usuario tiene TODOS los privilegios sobre la base de datos cafeDB
-- Puede: SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, etc.
-- 
-- CONEXIÓN EN .env:
-- DB_HOST=localhost
-- DB_USER=un_usr
-- DB_PASSWORD=una_clave
-- DB_NAME=cafeDB
-- DB_PORT=3306
CREATE USER IF NOT EXISTS 'un_usr'@'localhost' IDENTIFIED BY 'una_clave';
GRANT ALL PRIVILEGES ON cafeDB.* TO 'un_usr'@'localhost';
FLUSH PRIVILEGES;

-- =============================================
-- FIN DEL SCHEMA
-- =============================================
-- Total de registros creados:
-- - 56 productos (cafés especiales y básicos)
-- - 1 usuario de prueba (un_usr@gmail.com)
-- - 1 usuario MySQL (un_usr)
-- =============================================
