// ============================================
// CONTROLADOR DE AUTENTICACIÓN
// ============================================
// REQUERIMIENTO: Sistema de autenticación completo
// Este controlador maneja todas las operaciones relacionadas con usuarios:
// - Login (inicio de sesión)
// - Register (registro de nuevos usuarios)
// - Forgot Password (recuperación de contraseña por email)
// - Logout (cierre de sesión)
// ============================================

// Importar dependencias necesarias
const bcrypt = require('bcryptjs'); // Librería para encriptar contraseñas (hash)
const jwt = require('jsonwebtoken'); // Librería para generar tokens JWT
const nodemailer = require('nodemailer'); // Librería para envío de emails
const pool = require('../db/connection'); // Pool de conexiones a MySQL

// ============================================
// CONFIGURACIÓN DEL SERVICIO DE EMAIL
// ============================================
// REQUERIMIENTO: Envío de emails para recuperación de contraseña
// Configurar transporte SMTP usando Gmail (puede cambiarse a otro proveedor)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Servicio de email (gmail, outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER || 'tu_email@gmail.com', // Email del remitente
    pass: process.env.EMAIL_PASSWORD || 'tu_contraseña_app' // Contraseña de aplicación de Gmail
  }
});

// ============================================
// FUNCIÓN AUXILIAR: Generar contraseña aleatoria
// ============================================
/**
 * Genera una contraseña temporal aleatoria de 10 caracteres
 * Incluye letras minúsculas, números y 2 letras mayúsculas al final
 * Ejemplo: abc123xyz4XY
 */
const generarContraseña = () => {
  // .toString(36) convierte número a base 36 (0-9, a-z)
  // .slice(-8) toma los últimos 8 caracteres
  // .toUpperCase() convierte a mayúsculas los últimos 2 caracteres
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-2).toUpperCase();
};

// ============================================
// OBJETO CONTROLADOR CON TODAS LAS FUNCIONES
// ============================================
const authController = {
  
  // ==========================================
  // LOGIN - Inicio de Sesión
  // ==========================================
  // REQUERIMIENTO: Autenticación con JWT (JSON Web Token)
  // Valida credenciales y genera token para mantener sesión
  login: async (req, res) => {
    try {
      // Extraer email y contraseña del cuerpo de la petición
      const { email, password } = req.body;
      
      // VALIDACIÓN 1: Verificar que se envíen los campos requeridos
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // PASO 1: Obtener conexión del pool de MySQL
      const connection = await pool.getConnection();
      
      // PASO 2: Buscar usuario por email en la base de datos
      // SELECT * FROM usuarios WHERE email = ?
      // El ? es un placeholder que previene SQL injection
      const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      connection.release(); // Liberar la conexión de vuelta al pool

      // VALIDACIÓN 2: Verificar si el usuario existe
      if (users.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // PASO 3: Obtener el usuario encontrado
      const user = users[0];
      
      // PASO 4: Comparar contraseña proporcionada con el hash guardado en BD
      // bcrypt.compare() compara texto plano con hash de forma segura
      const passwordMatch = await bcrypt.compare(password, user.password);

      // VALIDACIÓN 3: Verificar si la contraseña es correcta
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // PASO 5: Generar token JWT con información del usuario
      // jwt.sign(payload, secret, options)
      // El token contiene: id y email del usuario
      // Se firma con una clave secreta del archivo .env
      // Expira en 24 horas
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload - datos del usuario
        process.env.JWT_SECRET || 'tu_secret_key', // Clave secreta
        { expiresIn: '24h' } // Opciones - expiración
      );

      // PASO 6: Responder con éxito, token y datos del usuario
      res.json({
        message: 'Login exitoso',
        token, // Token JWT para futuras peticiones autenticadas
        user: { id: user.id, nombre: user.nombre, email: user.email } // Datos básicos del usuario
      });
    } catch (error) {
      // Capturar cualquier error y registrarlo en consola
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  // ==========================================
  // REGISTER - Registro de Nuevos Usuarios
  // ==========================================
  // REQUERIMIENTO: Permitir que usuarios nuevos se registren en el sistema
  // Encripta la contraseña antes de guardarla (seguridad)
  register: async (req, res) => {
    try {
      // Extraer datos del cuerpo de la petición
      const { nombre, apellido, email, password } = req.body;

      // VALIDACIÓN 1: Verificar campos obligatorios
      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
      }

      // PASO 1: Obtener conexión a la base de datos
      const connection = await pool.getConnection();
      
      // PASO 2: Verificar si el email ya está registrado
      // Previene emails duplicados en el sistema
      const [existingUsers] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

      // VALIDACIÓN 2: Si el email ya existe, rechazar registro
      if (existingUsers.length > 0) {
        connection.release();
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // PASO 3: Encriptar la contraseña usando bcrypt
      // El segundo parámetro (10) es el número de rondas de salt
      // Mayor número = más seguro pero más lento
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // PASO 4: Insertar nuevo usuario en la base de datos
      // INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)
      await connection.query('INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', 
        [nombre, apellido || nombre, email, hashedPassword]); // apellido opcional, usa nombre si no se proporciona

      connection.release(); // Liberar conexión
      
      // PASO 5: Responder con éxito (201 = Created)
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  // ==========================================
  // FORGOT PASSWORD - Recuperación de Contraseña
  // ==========================================
  // ⭐ REQUERIMIENTO DEL PROFESOR: Envío de emails con nodemailer
  // Genera contraseña temporal y la envía al email del usuario
  forgotPassword: async (req, res) => {
    try {
      // Extraer email del cuerpo de la petición
      const { email } = req.body;

      // VALIDACIÓN 1: Verificar que se proporcione el email
      if (!email) {
        return res.status(400).json({ error: 'Email es requerido' });
      }

      // PASO 1: Obtener conexión a la base de datos
      const connection = await pool.getConnection();
      
      // PASO 2: Buscar usuario por email
      const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

      // VALIDACIÓN 2: Verificar que el email esté registrado
      if (users.length === 0) {
        connection.release();
        return res.status(404).json({ error: 'El email no está registrado' });
      }

      // PASO 3: Generar nueva contraseña temporal aleatoria
      const nuevaContraseña = generarContraseña();
      
      // PASO 4: Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

      // PASO 5: Actualizar contraseña en la base de datos
      // UPDATE usuarios SET password = ? WHERE email = ?
      await connection.query('UPDATE usuarios SET password = ? WHERE email = ?', 
        [hashedPassword, email]);
      connection.release();

      // ==========================================
      // PASO 6: CONFIGURAR Y ENVIAR EMAIL
      // ==========================================
      // Configurar opciones del email (remitente, destinatario, asunto, contenido)
      const mailOptions = {
        from: process.env.EMAIL_USER || 'tu_email@gmail.com', // Email remitente
        to: email, // Email destinatario (usuario que solicitó recuperación)
        subject: '🔐 Recuperación de Contraseña - CafeSantander', // Asunto del email
        html: `
          <h2>Recuperación de Contraseña</h2>
          <p>Hola,</p>
          <p>Hemos generado una nueva contraseña temporal para tu cuenta:</p>
          <p><strong>Nueva Contraseña: ${nuevaContraseña}</strong></p>
          <p>Por favor, inicia sesión con esta contraseña y cámbiala en tu perfil.</p>
          <p>Si no solicitaste esta recuperación, ignora este email.</p>
          <br>
          <p>CafeSantander 🎉</p>
        ` // Contenido HTML del email
      };

      // PASO 7: Enviar el email usando nodemailer
      // transporter.sendMail() envía el email de forma asíncrona
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // Si hay error al enviar, registrarlo y responder con error
          console.error('Error al enviar email:', error);
          return res.status(500).json({ error: 'Error al enviar email. Intenta más tarde.' });
        }
        // Si el email se envía exitosamente, responder con éxito
        res.json({ 
          message: 'Nueva contraseña enviada al email. Revisa tu bandeja de entrada.' 
        });
      });
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      res.status(500).json({ error: 'Error al recuperar contraseña' });
    }
  },

  // ==========================================
  // LOGOUT - Cierre de Sesión
  // ==========================================
  // En JWT no se necesita hacer nada en el servidor
  // El cliente simplemente elimina el token de su almacenamiento
  logout: (req, res) => {
    res.json({ message: 'Logout exitoso' });
  }
};

// ============================================
// EXPORTAR CONTROLADOR
// ============================================
// Exportar el objeto authController para usarlo en las rutas
module.exports = authController;
