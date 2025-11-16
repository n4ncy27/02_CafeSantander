// ============================================
// AUTH.JS - MIDDLEWARE DE AUTENTICACIÓN JWT
// ============================================
// REQUERIMIENTO: Protección de rutas del backend con JWT
// Este middleware verifica que el usuario esté autenticado
// antes de permitir acceso a rutas protegidas
// ============================================

// Importar librería para verificar tokens JWT
const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación
 * 
 * FUNCIONALIDAD:
 * 1. Extrae el token JWT del header Authorization
 * 2. Verifica que el token sea válido y no haya expirado
 * 3. Decodifica el token para obtener datos del usuario
 * 4. Agrega los datos del usuario a req.user
 * 5. Permite continuar si todo es correcto (next())
 * 6. Rechaza la petición si el token es inválido (401 Unauthorized)
 * 
 * USO EN RUTAS:
 * router.get('/api/carrito', authMiddleware, carritoController.obtener);
 * 
 * @param {Object} req - Objeto de petición Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función para continuar al siguiente middleware
 */
const authMiddleware = (req, res, next) => {
  try {
    // ============================================
    // PASO 1: EXTRAER TOKEN DEL HEADER
    // ============================================
    // El token viene en el header: "Authorization: Bearer TOKEN_JWT"
    // .split(' ')[1] obtiene solo el token (después de "Bearer ")
    const token = req.headers.authorization?.split(' ')[1];

    // VALIDACIÓN 1: Verificar que se envió el token
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // ============================================
    // PASO 2: VERIFICAR Y DECODIFICAR TOKEN
    // ============================================
    // jwt.verify() verifica:
    // - Que el token fue firmado con la clave secreta correcta
    // - Que no haya sido manipulado
    // - Que no haya expirado
    // Retorna el payload decodificado (id, email)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ============================================
    // PASO 3: AGREGAR DATOS DEL USUARIO A LA PETICIÓN
    // ============================================
    // req.user estará disponible en el controlador
    // Contiene: { id: 123, email: 'usuario@email.com' }
    req.user = decoded;
    
    // ============================================
    // PASO 4: CONTINUAR AL SIGUIENTE MIDDLEWARE/CONTROLADOR
    // ============================================
    next(); // Autenticación exitosa, permitir acceso
    
  } catch (error) {
    // ============================================
    // MANEJO DE ERRORES
    // ============================================
    // Capturar errores de verificación JWT:
    // - TokenExpiredError: Token expirado
    // - JsonWebTokenError: Token inválido o manipulado
    console.error('Error en autenticación:', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// ============================================
// EXPORTAR MIDDLEWARE
// ============================================
// El middleware se usa en las rutas protegidas
module.exports = authMiddleware;
