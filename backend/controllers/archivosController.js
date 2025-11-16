// ============================================
// ARCHIVOSCONTROLLER.JS - CONTROLADOR DE ARCHIVOS
// ============================================
// REQUERIMIENTO: Gestión de archivos multimedia
// Funciones:
// - Subir archivo(s) a /public/uploads
// - Listar archivos de /uploads y /turismo
// - Descargar archivo específico
// - Eliminar archivo
// Usa multer para procesamiento de archivos multipart/form-data

const path = require('path');
const fs = require('fs');

// Directorios de almacenamiento
const uploadsDir = path.join(__dirname, '../public/uploads');   // Archivos subidos por usuarios
const turismoDir = path.join(__dirname, '../public/turismo');   // Archivos de turismo estáticos

const archivosController = {
  // Subir archivo
  subirArchivo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No se proporcionó ningún archivo'
        });
      }

      const fileUrl = `/public/uploads/${req.file.filename}`;
      
      res.status(201).json({
        success: true,
        message: 'Archivo subido exitosamente',
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          url: fileUrl,
          path: req.file.path
        }
      });
    } catch (error) {
      console.error('Error al subir archivo:', error);
      res.status(500).json({
        success: false,
        error: 'Error al subir archivo: ' + error.message
      });
    }
  },

  // Subir múltiples archivos
  subirArchivos: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No se proporcionaron archivos'
        });
      }

      const archivos = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: `/public/uploads/${file.filename}`,
        path: file.path
      }));

      res.status(201).json({
        success: true,
        message: `${archivos.length} archivo(s) subido(s) exitosamente`,
        data: archivos
      });
    } catch (error) {
      console.error('Error al subir archivos:', error);
      res.status(500).json({
        success: false,
        error: 'Error al subir archivos: ' + error.message
      });
    }
  },

  // Listar archivos de uploads
  listarArchivos: async (req, res) => {
    try {
      if (!fs.existsSync(uploadsDir)) {
        return res.json({
          success: true,
          data: [],
          total: 0
        });
      }

      const files = fs.readdirSync(uploadsDir);
      const archivos = files.map(filename => {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        
        return {
          filename,
          url: `/public/uploads/${filename}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      });

      res.json({
        success: true,
        data: archivos,
        total: archivos.length
      });
    } catch (error) {
      console.error('Error al listar archivos:', error);
      res.status(500).json({
        success: false,
        error: 'Error al listar archivos: ' + error.message
      });
    }
  },

  // Listar archivos de turismo
  listarArchivosTurismo: async (req, res) => {
    try {
      if (!fs.existsSync(turismoDir)) {
        return res.json({
          success: true,
          data: [],
          total: 0
        });
      }

      const files = fs.readdirSync(turismoDir).filter(file => {
        // Filtrar solo archivos (no carpetas ni README)
        const filePath = path.join(turismoDir, file);
        return fs.statSync(filePath).isFile() && 
               !['.md', '.html', '.txt'].includes(path.extname(file).toLowerCase()) ||
               ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.webm'].includes(path.extname(file).toLowerCase());
      });

      const archivos = files.map(filename => {
        const filePath = path.join(turismoDir, filename);
        const stats = fs.statSync(filePath);
        
        return {
          filename,
          url: `/public/turismo/${filename}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          type: path.extname(filename).toLowerCase()
        };
      });

      res.json({
        success: true,
        data: archivos,
        total: archivos.length
      });
    } catch (error) {
      console.error('Error al listar archivos de turismo:', error);
      res.status(500).json({
        success: false,
        error: 'Error al listar archivos: ' + error.message
      });
    }
  },

  // Eliminar archivo
  eliminarArchivo: async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadsDir, filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: 'Archivo no encontrado'
        });
      }

      fs.unlinkSync(filePath);

      res.json({
        success: true,
        message: 'Archivo eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      res.status(500).json({
        success: false,
        error: 'Error al eliminar archivo: ' + error.message
      });
    }
  },

  // Descargar archivo
  descargarArchivo: async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadsDir, filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: 'Archivo no encontrado'
        });
      }

      res.download(filePath, filename);
    } catch (error) {
      console.error('Error al descargar archivo:', error);
      res.status(500).json({
        success: false,
        error: 'Error al descargar archivo: ' + error.message
      });
    }
  }
};

module.exports = archivosController;
