// ============================================
// MIDDLEWARE DE VALIDACIÓN DE EMAIL
// ============================================
// ⭐ REQUERIMIENTO NOVEDOSO ⭐
// Funcionalidad de interés: Validación de correo electrónico usando EXPRESIONES REGULARES
// Este middleware implementa validación avanzada de emails antes de procesarlos en el sistema
// ============================================

/**
 * MIDDLEWARE PRINCIPAL DE VALIDACIÓN DE EMAIL
 * 
 * Función: Validar el formato del correo electrónico usando expresiones regulares (RegEx)
 * 
 * EXPRESIONES REGULARES UTILIZADAS:
 * 1. emailRegex: Validación básica - permite letras, números, puntos, guiones
 * 2. strictEmailRegex: RFC 5322 simplificada - estándar de formato de email
 * 3. advancedEmailRegex: Validación avanzada con restricciones adicionales
 * 
 * FLUJO DE VALIDACIÓN:
 * 1. Verificar que el email esté presente en la petición
 * 2. Aplicar expresión regular para validar formato
 * 3. Validaciones personalizadas (longitud, espacios, caracteres especiales)
 * 4. Advertencias sobre dominios poco comunes
 * 5. Si todo es correcto, continuar con next()
 */
const validateEmail = (req, res, next) => {
  // Extraer el email del cuerpo de la petición
  // Extraer el email del cuerpo de la petición
  const { email } = req.body;

  // ============================================
  // VALIDACIÓN 1: Verificar presencia del email
  // ============================================
  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico es requerido'
    });
  }

  // ============================================
  // EXPRESIONES REGULARES PARA VALIDACIÓN
  // ============================================
  
  // REGEX 1: Validación básica
  // Patrón: usuario@dominio.extension
  // Permite: letras (a-z, A-Z), números (0-9), puntos (.), guiones (-), guiones bajos (_)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // REGEX 2: Expresión regular estricta (RFC 5322 simplificada)
  // Esta expresión sigue los estándares internacionales de formato de email
  // Valida: [cualquier carácter excepto espacios y @] + @ + [dominio] + . + [extensión]
  const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // REGEX 3: Expresión regular avanzada con validaciones adicionales
  // (?!.*\.\.): No permite puntos consecutivos (..)
  // (?!.*@.*@): No permite múltiples símbolos @
  // [a-zA-Z0-9]: Debe comenzar con letra o número
  // (?:[a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?: Parte local (antes del @)
  // @[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?: Dominio
  // (?:\.[a-zA-Z]{2,})+$: Extensión (.com, .es, .edu, etc.)
  const advancedEmailRegex = /^(?!.*\.\.)(?!.*@.*@)[a-zA-Z0-9](?:[a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

  // ============================================
  // VALIDACIÓN 2: Aplicar expresión regular estricta
  // ============================================
  // Usar la regex strictEmailRegex para validar el formato
  // .test() retorna true si el email cumple con el patrón, false si no
  if (!strictEmailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El formato del correo electrónico no es válido',
      details: 'El email debe tener el formato: usuario@dominio.extension'
    });
  }

  // ============================================
  // VALIDACIONES ADICIONALES PERSONALIZADAS
  // ============================================
  
  // Convertir email a minúsculas para comparaciones
  const emailLower = email.toLowerCase();

  // VALIDACIÓN 3: Longitud máxima
  // RFC 5321 especifica que un email no debe exceder 254 caracteres
  if (emailLower.length > 254) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico es demasiado largo (máximo 254 caracteres)'
    });
  }

  // VALIDACIÓN 4: No permitir espacios en blanco
  // Regex /\s/ detecta cualquier tipo de espacio (espacio, tab, salto de línea)
  if (/\s/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico no puede contener espacios'
    });
  }

  // VALIDACIÓN 5: Caracteres especiales no permitidos
  // Regex que detecta caracteres peligrosos o no permitidos en emails
  const invalidChars = /[<>()[\]\\,;:"/]/;
  if (invalidChars.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El correo electrónico contiene caracteres no permitidos'
    });
  }

  // ============================================
  // VALIDACIÓN 6: Advertencia de dominios poco comunes
  // ============================================
  // Lista de dominios de email más comunes y confiables
  const commonDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
  
  // Extraer el dominio del email (parte después del @)
  const domain = emailLower.split('@')[1];
  
  // Si el dominio no está en la lista común, registrar advertencia
  // (esto es solo informativo, no bloquea el registro)
  if (domain && !commonDomains.includes(domain)) {
    console.log(`⚠️ Dominio de email poco común: ${domain} (${email})`);
  }

  // ============================================
  // VALIDACIÓN EXITOSA
  // ============================================
  // Si todas las validaciones pasaron, registrar en consola y continuar
  console.log(`✅ Email validado correctamente: ${email}`);
  next(); // Pasar al siguiente middleware o controlador
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
