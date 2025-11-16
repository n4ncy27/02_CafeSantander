// ============================================
// FUNCIONALIDAD NOVEDOSA Y DE INTERÉS
// Middleware para validar el correo electrónico con expresiones regulares
// ============================================

/**
 * Middleware de validación de email usando expresiones regulares
 * Valida el formato del correo electrónico antes de procesarlo
 * Expresión regular RFC 5322 simplificada
 */
const validateEmail = (req, res, next) => {
  const { email } = req.body;

  // Verificar que el email esté presente
  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico es requerido'
    });
  }

  // Expresión regular para validar formato de email
  // Valida: usuario@dominio.extension
  // Permite letras, números, puntos, guiones y guiones bajos
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular más estricta (RFC 5322 simplificada)
  // Esta es más completa y sigue los estándares de email
  const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expresión regular avanzada con validaciones adicionales
  const advancedEmailRegex = /^(?!.*\.\.)(?!.*@.*@)[a-zA-Z0-9](?:[a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

  // Validar usando la expresión regular estricta
  if (!strictEmailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El formato del correo electrónico no es válido',
      details: 'El email debe tener el formato: usuario@dominio.extension'
    });
  }

  // Validaciones adicionales personalizadas
  const emailLower = email.toLowerCase();

  // Validar longitud razonable
  if (emailLower.length > 254) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico es demasiado largo (máximo 254 caracteres)'
    });
  }

  // Validar que no tenga espacios
  if (/\s/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico no puede contener espacios'
    });
  }

  // Validar que no tenga caracteres especiales no permitidos
  const invalidChars = /[<>()[\]\\,;:"/]/;
  if (invalidChars.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico contiene caracteres no permitidos'
    });
  }

  // Validar dominios comunes mal escritos (sugerencias)
  const commonDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
  const domain = emailLower.split('@')[1];
  
  // Advertencia para dominios sospechosos (opcional, solo log)
  if (domain && !commonDomains.includes(domain)) {
    console.log(`⚠️ Dominio de email poco común: ${domain} (${email})`);
  }

  // Si todas las validaciones pasan, continuar
  console.log(`✅ Email validado correctamente: ${email}`);
  next();
};

/**
 * Middleware alternativo con validación más permisiva
 * Para casos donde se necesite mayor flexibilidad
 */
const validateEmailPermissive = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico es requerido'
    });
  }

  // Regex permisivo - solo verifica estructura básica
  const basicEmailRegex = /^.+@.+\..+$/;

  if (!basicEmailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El formato del correo electrónico no es válido'
    });
  }

  next();
};

/**
 * Middleware con validación estricta y sugerencias de corrección
 */
const validateEmailWithSuggestions = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico es requerido'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    // Detectar errores comunes y sugerir correcciones
    let suggestion = '';
    
    if (!email.includes('@')) {
      suggestion = 'Falta el símbolo @';
    } else if (email.indexOf('@') !== email.lastIndexOf('@')) {
      suggestion = 'El email contiene múltiples símbolos @';
    } else if (!email.split('@')[1]?.includes('.')) {
      suggestion = 'Falta el punto en el dominio (ej: @gmail.com)';
    } else if (email.endsWith('.')) {
      suggestion = 'El email no puede terminar con un punto';
    } else if (email.includes('..')) {
      suggestion = 'El email no puede contener puntos consecutivos';
    }

    return res.status(400).json({
      success: false,
      error: 'El formato del correo electrónico no es válido',
      suggestion: suggestion || 'Verifica el formato: usuario@dominio.extension'
    });
  }

  next();
};

module.exports = {
  validateEmail,
  validateEmailPermissive,
  validateEmailWithSuggestions
};
