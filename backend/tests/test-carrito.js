/**
 * Script de prueba para CRUD de Carrito
 * Ejecutar: node backend/tests/test-carrito.js
 * 
 * Requisitos previos:
 * 1. Backend corriendo en http://localhost:5000
 * 2. Usuario registrado con email/password
 * 3. Al menos un producto en la BD
 */

const BASE_URL = 'http://localhost:5000';
let token = '';
let carritoId = '';
let itemId = '';

// Función auxiliar para hacer requests
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    const data = await response.json();
    
    console.log(`\n📍 ${options.method || 'GET'} ${endpoint}`);
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { response, data };
  } catch (error) {
    console.error(`❌ Error en ${endpoint}:`, error.message);
    return { error };
  }
}

// Tests
async function runTests() {
  console.log('🧪 Iniciando pruebas de CRUD de Carrito\n');
  console.log('='.repeat(60));

  // 1. Login
  console.log('\n1️⃣ LOGIN');
  const loginResult = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'admin@cafesantander.com', // Cambia según tu usuario
      password: '123',
    }),
  });

  if (loginResult.data?.token) {
    token = loginResult.data.token;
    console.log('✅ Login exitoso');
  } else {
    console.log('❌ Login fallido. Verifica las credenciales.');
    return;
  }

  // 2. Obtener carrito (debería crear uno si no existe)
  console.log('\n2️⃣ OBTENER CARRITO');
  const carritoResult = await request('/api/carrito');
  if (carritoResult.data?.carritoId) {
    carritoId = carritoResult.data.carritoId;
    console.log(`✅ Carrito obtenido/creado: ID ${carritoId}`);
  }

  // 3. Agregar producto al carrito
  console.log('\n3️⃣ AGREGAR PRODUCTO AL CARRITO');
  const agregarResult = await request('/api/carrito/agregar', {
    method: 'POST',
    body: JSON.stringify({
      productId: 1, // Cambia según tu BD
      quantity: 2,
    }),
  });

  if (agregarResult.data?.message) {
    console.log('✅ Producto agregado');
  }

  // 4. Obtener carrito actualizado
  console.log('\n4️⃣ OBTENER CARRITO ACTUALIZADO');
  const carritoActualizadoResult = await request('/api/carrito');
  if (carritoActualizadoResult.data?.items?.length > 0) {
    itemId = carritoActualizadoResult.data.items[0].id;
    console.log(`✅ Carrito tiene ${carritoActualizadoResult.data.items.length} item(s)`);
    console.log(`   Total: $${carritoActualizadoResult.data.total}`);
  }

  // 5. Actualizar cantidad
  console.log('\n5️⃣ ACTUALIZAR CANTIDAD');
  if (itemId) {
    await request(`/api/carrito/actualizar/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        quantity: 5,
      }),
    });
    console.log('✅ Cantidad actualizada');
  }

  // 6. Listar todos los carritos (admin)
  console.log('\n6️⃣ LISTAR TODOS LOS CARRITOS (ADMIN)');
  const todosCarritosResult = await request('/api/carrito/admin/todos');
  if (todosCarritosResult.data?.data) {
    console.log(`✅ Total de carritos: ${todosCarritosResult.data.total}`);
  }

  // 7. Obtener carrito por ID (admin)
  console.log('\n7️⃣ OBTENER CARRITO POR ID (ADMIN)');
  if (carritoId) {
    await request(`/api/carrito/admin/${carritoId}`);
    console.log('✅ Carrito obtenido por ID');
  }

  // 8. Eliminar item del carrito
  console.log('\n8️⃣ ELIMINAR ITEM DEL CARRITO');
  if (itemId) {
    await request(`/api/carrito/eliminar/${itemId}`, {
      method: 'DELETE',
    });
    console.log('✅ Item eliminado');
  }

  // 9. Vaciar carrito
  console.log('\n9️⃣ VACIAR CARRITO');
  await request('/api/carrito/vaciar', {
    method: 'DELETE',
  });
  console.log('✅ Carrito vaciado');

  // 10. Eliminar carrito completo (admin)
  console.log('\n🔟 ELIMINAR CARRITO COMPLETO (ADMIN)');
  if (carritoId) {
    await request(`/api/carrito/admin/${carritoId}`, {
      method: 'DELETE',
    });
    console.log('✅ Carrito eliminado');
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Pruebas completadas\n');
}

// Ejecutar tests
runTests().catch(console.error);
