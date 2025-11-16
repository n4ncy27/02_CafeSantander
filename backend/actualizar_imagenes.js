// =============================================
// SCRIPT DE ACTUALIZACIÓN DE IMÁGENES
// =============================================
// Este script actualiza las rutas de las imágenes en la base de datos
// para que coincidan con la estructura de carpetas del backend
//
// CUÁNDO EJECUTAR:
// - Después de crear la base de datos con schema.sql
// - Si las imágenes no se están mostrando correctamente
//
// CÓMO EJECUTAR:
// Desde la carpeta backend:
// node actualizar_imagenes.js
// =============================================

const pool = require('./db/connection');

async function actualizarImagenes() {
  console.log('🔄 Iniciando actualización de rutas de imágenes...\n');
  
  try {
    // Actualizar productos básicos con sus rutas correctas
    const updates = [
      { nombre: 'Espresso', imagen: '/imagenes/expreso.png' },
      { nombre: 'Latte', imagen: '/imagenes/latte.png' },
      { nombre: 'Mocachino', imagen: '/imagenes/mocachino.png' },
      { nombre: 'Chocolate', imagen: '/imagenes/chocolate.png' },
      { nombre: 'Pastel de Chocolate', imagen: '/imagenes/pastelchocolate.png' },
      { nombre: 'Galletas', imagen: '/imagenes/galletitas.png' }
    ];

    console.log('📝 Actualizando productos básicos...');
    
    for (const { nombre, imagen } of updates) {
      await pool.query('UPDATE productos SET imagen = ? WHERE nombre = ?', [imagen, nombre]);
    }
    
    // Verificar las actualizaciones
    const [rows] = await pool.query('SELECT id, nombre, imagen FROM productos WHERE id <= 6 ORDER BY id');
    
    console.log('\n✅ Rutas actualizadas correctamente:\n');
    rows.forEach(r => {
      console.log(`  ${r.id}. ${r.nombre.padEnd(25)} → ${r.imagen}`);
    });
    
    console.log('\n📌 Nota: Los productos de la ruleta catadora ya tienen las rutas correctas');
    console.log('   en /imagenes/cafe/ y coinciden con los archivos existentes.\n');
    
    await pool.end();
    console.log('✅ Base de datos actualizada exitosamente\n');
    process.exit(0);
    
  } catch (err) {
    console.error('\n❌ Error al actualizar imágenes:', err.message);
    console.log('\n💡 Verifica que:');
    console.log('   1. XAMPP MySQL esté ejecutándose');
    console.log('   2. La base de datos cafeDB exista');
    console.log('   3. Las credenciales en .env sean correctas\n');
    
    await pool.end();
    process.exit(1);
  }
}

// Ejecutar la función
actualizarImagenes();
