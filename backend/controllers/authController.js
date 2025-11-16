const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../db/connection');

// Configurar transporte de email (usar Gmail o tu proveedor)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tu_email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'tu_contraseña_app'
  }
});

// Función para generar contraseña aleatoria
const generarContraseña = () => {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-2).toUpperCase();
};

const authController = {
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      const connection = await pool.getConnection();
      const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      connection.release();

      if (users.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'tu_secret_key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, nombre: user.nombre, email: user.email }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  // Register
  register: async (req, res) => {
    try {
      const { nombre, apellido, email, password } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
      }

      const connection = await pool.getConnection();
      const [existingUsers] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

      if (existingUsers.length > 0) {
        connection.release();
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.query('INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', 
        [nombre, apellido || nombre, email, hashedPassword]);

      connection.release();
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  // Recuperación de contraseña - Enviar nueva contraseña al email
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email es requerido' });
      }

      const connection = await pool.getConnection();
      const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

      if (users.length === 0) {
        connection.release();
        return res.status(404).json({ error: 'El email no está registrado' });
      }

      // Generar nueva contraseña temporal
      const nuevaContraseña = generarContraseña();
      const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

      // Actualizar contraseña en BD
      await connection.query('UPDATE usuarios SET password = ? WHERE email = ?', 
        [hashedPassword, email]);
      connection.release();

      // Enviar email con nueva contraseña
      const mailOptions = {
        from: process.env.EMAIL_USER || 'tu_email@gmail.com',
        to: email,
        subject: '🔐 Recuperación de Contraseña - CafeSantander',
        html: `
          <h2>Recuperación de Contraseña</h2>
          <p>Hola,</p>
          <p>Hemos generado una nueva contraseña temporal para tu cuenta:</p>
          <p><strong>Nueva Contraseña: ${nuevaContraseña}</strong></p>
          <p>Por favor, inicia sesión con esta contraseña y cámbiala en tu perfil.</p>
          <p>Si no solicitaste esta recuperación, ignora este email.</p>
          <br>
          <p>CafeSantander 🎉</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar email:', error);
          return res.status(500).json({ error: 'Error al enviar email. Intenta más tarde.' });
        }
        res.json({ 
          message: 'Nueva contraseña enviada al email. Revisa tu bandeja de entrada.' 
        });
      });
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      res.status(500).json({ error: 'Error al recuperar contraseña' });
    }
  },

  // Logout
  logout: (req, res) => {
    res.json({ message: 'Logout exitoso' });
  }
};

module.exports = authController;
