const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

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
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, name: user.name, email: user.email }
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

  // Logout
  logout: (req, res) => {
    res.json({ message: 'Logout exitoso' });
  }
};

module.exports = authController;
