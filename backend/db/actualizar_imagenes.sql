-- =============================================
-- ACTUALIZACIÓN DE RUTAS DE IMÁGENES
-- =============================================
-- Este script actualiza las rutas de las imágenes en la base de datos
-- para que coincidan con la estructura de carpetas del backend
-- 
-- CUÁNDO EJECUTAR:
-- - Después de crear la base de datos con schema.sql
-- - Si las imágenes no se están mostrando correctamente
--
-- CÓMO EJECUTAR:
-- Opción 1 (phpMyAdmin): Copiar y pegar este contenido en la pestaña SQL
-- Opción 2 (Terminal): mysql -u root -p cafeDB < actualizar_imagenes.sql
-- Opción 3 (Node.js): node actualizar_imagenes.js (desde la carpeta backend)
-- =============================================

USE cafeDB;

-- Actualizar productos básicos (están en la raíz de /imagenes/)
UPDATE productos SET imagen = '/imagenes/expreso.png' WHERE nombre = 'Espresso';
UPDATE productos SET imagen = '/imagenes/latte.png' WHERE nombre = 'Latte';
UPDATE productos SET imagen = '/imagenes/mocachino.png' WHERE nombre = 'Mocachino';
UPDATE productos SET imagen = '/imagenes/chocolate.png' WHERE nombre = 'Chocolate';
UPDATE productos SET imagen = '/imagenes/pastelchocolate.png' WHERE nombre = 'Pastel de Chocolate';
UPDATE productos SET imagen = '/imagenes/galletitas.png' WHERE nombre = 'Galletas';

-- Verificar que las rutas se actualizaron correctamente
SELECT 'Actualización completada. Productos básicos:' AS mensaje;
SELECT id, nombre, imagen FROM productos WHERE id <= 6;

SELECT 'Todos los productos de la ruleta catadora ya tienen rutas correctas en /imagenes/cafe/' AS info;

-- Nota: Los productos de la ruleta catadora ya tienen las rutas correctas
-- en /imagenes/cafe/ y coinciden con los archivos existentes
