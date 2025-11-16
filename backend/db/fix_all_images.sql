-- Script para corregir rutas de imágenes faltantes
-- Las imágenes existentes se mapean inteligentemente según el nombre del producto

UPDATE productos SET imagen = '/imagenes/cafe/temora.jpg' WHERE id = 7;  -- Café con Mora
UPDATE productos SET imagen = '/imagenes/cafe/teframbuesa.jpg' WHERE id = 8;  -- Café con Frambuesa
UPDATE productos SET imagen = '/imagenes/cafe/tearanonos.jpg' WHERE id = 9;  -- Café con Arándano
UPDATE productos SET imagen = '/imagenes/cafe/tefresas.jpg' WHERE id = 10;  -- Café con Fresa
UPDATE productos SET imagen = '/imagenes/cafe/teuvaspasas.jpg' WHERE id = 11;  -- Café con Pasas de Uva
UPDATE productos SET imagen = '/imagenes/cafe/tepasasciruela.jpg' WHERE id = 12;  -- Café con Pasas de Ciruela
UPDATE productos SET imagen = '/imagenes/cafe/cafecoco.jpg' WHERE id = 13;  -- Café con Coco
UPDATE productos SET imagen = '/imagenes/cafe/cafecereza.jpg' WHERE id = 14;  -- Café con Cereza
UPDATE productos SET imagen = '/imagenes/cafe/cafegranada.jpg' WHERE id = 15;  -- Café con Granada
UPDATE productos SET imagen = '/imagenes/cafe/cafepiña.jpg' WHERE id = 16;  -- Café con Piña
UPDATE productos SET imagen = '/imagenes/cafe/cafeuva.jpg' WHERE id = 17;  -- Café con Uva
UPDATE productos SET imagen = '/imagenes/cafe/cafemanzana.jpg' WHERE id = 18;  -- Café con Manzana
UPDATE productos SET imagen = '/imagenes/cafe/cafedurazno.jpg' WHERE id = 19;  -- Café con Melocotón
UPDATE productos SET imagen = '/imagenes/cafe/cafepera.jpg' WHERE id = 20;  -- Café con Pera
UPDATE productos SET imagen = '/imagenes/cafe/cafepomelo.jpg' WHERE id = 21;  -- Café con Pomelo
UPDATE productos SET imagen = '/imagenes/cafe/cafenaranja.jpg' WHERE id = 22;  -- Café con Naranja
UPDATE productos SET imagen = '/imagenes/cafe/cafelimon.jpg' WHERE id = 23;  -- Café con Limón
UPDATE productos SET imagen = '/imagenes/cafe/cafelima.jpg' WHERE id = 24;  -- Café con Lima
UPDATE productos SET imagen = '/imagenes/cafe/temanzanilla.jpg' WHERE id = 25;  -- Café con Manzanilla
UPDATE productos SET imagen = '/imagenes/cafe/tejazmin.jpg' WHERE id = 26;  -- Café con Jazmín
UPDATE productos SET imagen = '/imagenes/cafe/terosa.jpg' WHERE id = 27;  -- Café con Rosas
UPDATE productos SET imagen = '/imagenes/cafe/cafemelaza.jpg' WHERE id = 28;  -- Café de Melaza
UPDATE productos SET imagen = '/imagenes/cafe/cafemiel.jpg' WHERE id = 29;  -- Café de Miel
UPDATE productos SET imagen = '/imagenes/cafe/cafejarabemanzana.jpg' WHERE id = 30;  -- Café con Jarabe de Manzana
UPDATE productos SET imagen = '/imagenes/cafe/cafecaramelizado.jpg' WHERE id = 31;  -- Café Caramelizado
UPDATE productos SET imagen = '/imagenes/cafe/cafearomaticoacido.jpg' WHERE id = 32;  -- Café con Aromáticos Ácidos
UPDATE productos SET imagen = '/imagenes/cafe/cafeacetico.jpg' WHERE id = 33;  -- Café con Ácido Acético
UPDATE productos SET imagen = '/imagenes/cafe/cafeacre.jpg' WHERE id = 34;  -- Café con Ácido Butírico (usando Acre como similar)
UPDATE productos SET imagen = '/imagenes/cafe/cafeisolaverico.jpg' WHERE id = 35;  -- Café con Ácido Isovalérico
UPDATE productos SET imagen = '/imagenes/cafe/caecitrico.jpg' WHERE id = 36;  -- Café con Ácido Cítrico
UPDATE productos SET imagen = '/imagenes/cafe/cafemalico.jpg' WHERE id = 37;  -- Café con Ácido Málico
UPDATE productos SET imagen = '/imagenes/cafe/cafevino.jpg' WHERE id = 38;  -- Café Vinoso
UPDATE productos SET imagen = '/imagenes/cafe/cafewisky.jpg' WHERE id = 39;  -- Café con Whisky
UPDATE productos SET imagen = '/imagenes/cafe/cafefermentado.jpg' WHERE id = 40;  -- Café Fermentado
UPDATE productos SET imagen = '/imagenes/cafe/cafemuymaduro.jpg' WHERE id = 41;  -- Café Muy Maduro
UPDATE productos SET imagen = '/imagenes/cafe/cafepocomaduro.jpg' WHERE id = 42;  -- Café Poco Maduro
UPDATE productos SET imagen = '/imagenes/cafe/cafeguisantes.jpg' WHERE id = 43;  -- Café con Aroma de Peapod (guisantes similar)
UPDATE productos SET imagen = '/imagenes/cafe/cafecrudo.jpg' WHERE id = 44;  -- Café Fresco (usando Crudo)
UPDATE productos SET imagen = '/imagenes/cafe/cafeuro.jpg' WHERE id = 45;  -- Café Duro (Euro similar)
UPDATE productos SET imagen = '/imagenes/cafe/cafecarton.jpg' WHERE id = 46;  -- Café con Aroma a Cartón
UPDATE productos SET imagen = '/imagenes/cafe/cafetostado.jpg' WHERE id = 47;  -- Café Tostado
UPDATE productos SET imagen = '/imagenes/cafe/cafeacre.jpg' WHERE id = 48;  -- Café Acre
UPDATE productos SET imagen = '/imagenes/cafe/cafeceniciento.jpg' WHERE id = 49;  -- Café Ceniciento
UPDATE productos SET imagen = '/imagenes/cafe/cafeanis.jpg' WHERE id = 50;  -- Café de Anís
UPDATE productos SET imagen = '/imagenes/cafe/cafemoscada.jpg' WHERE id = 51;  -- Café con Nuez Moscada
UPDATE productos SET imagen = '/imagenes/cafe/cafecanela.jpg' WHERE id = 52;  -- Café con Canela
UPDATE productos SET imagen = '/imagenes/cafe/cafeclavo.jpg' WHERE id = 53;  -- Café con Clavo
UPDATE productos SET imagen = '/imagenes/cafe/cafecacahuate.jpg' WHERE id = 54;  -- Café de Cacahuate
UPDATE productos SET imagen = '/imagenes/cafe/cafeavellana.jpg' WHERE id = 55;  -- Café con Avellana

-- Verificar cambios
SELECT id, nombre, imagen FROM productos ORDER BY id;
