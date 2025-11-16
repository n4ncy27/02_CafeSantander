-- Actualizar rutas de imágenes de productos para que coincidan con los archivos reales
-- Las imágenes están en /imagenes/*.png (no en /imagenes/cafe/*.jpg)

UPDATE productos SET imagen = '/imagenes/expreso.png' WHERE id = 1 AND nombre = 'Espresso';
UPDATE productos SET imagen = '/imagenes/latte.png' WHERE id = 2 AND nombre = 'Latte';
UPDATE productos SET imagen = '/imagenes/mocachino.png' WHERE id = 3 AND nombre = 'Mocachino';
UPDATE productos SET imagen = '/imagenes/chocolate.png' WHERE id = 4 AND nombre = 'Chocolate';
UPDATE productos SET imagen = '/imagenes/pastelchocolate.png' WHERE id = 5 AND nombre = 'Pastel de Chocolate';
UPDATE productos SET imagen = '/imagenes/galletitas.png' WHERE id = 6 AND nombre = 'Galletas';

-- Verificar los cambios
SELECT id, nombre, imagen FROM productos ORDER BY id;
