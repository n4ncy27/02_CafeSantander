// ============================================
// UPLOAD.JS - MIDDLEWARE DE CARGA DE ARCHIVOS
// ============================================
// REQUERIMIENTO: Procesamiento de archivos multimedia con multer
// Configuración:
// - Almacenamiento en /public/uploads
// - Nombre único: nombre-timestamp-random.ext
// - Tipos permitidos: imágenes, videos, documentos
// - Límite: 100MB por archivo
// - Validación de tipos MIME

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ============================================
// CREAR DIRECTORIO DE UPLOADS
// ============================================
// Verifica y crea /public/uploads si no existe
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ============================================
// CONFIGURACIÓN DE ALMACENAMIENTO
// ============================================
// Define dónde y cómo guardar los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp-nombre_original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// ============================================
// FILTRO DE TIPOS DE ARCHIVO
// ============================================
// Valida que el archivo sea de un tipo permitido
// Tipos aceptados:
// - Imágenes: JPEG, JPG, PNG, GIF, WEBP
// - Videos: MP4, WEBM, MPEG, MOV
// - Documentos: PDF, TXT, DOC, DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Imágenes
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    // Videos
    'video/mp4',
    'video/webm',
    'video/mpeg',
    'video/quicktime',
    // Documentos
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}. Solo se permiten: imágenes (JPG, PNG, GIF, WEBP), videos (MP4, WEBM, MOV), y documentos (PDF, TXT, DOC, DOCX)`), false);
  }
};

// ============================================
// CONFIGURACIÓN DE MULTER
// ============================================
// Combina storage, fileFilter y limits
const upload = multer({
  storage: storage,          // Dónde y cómo guardar
  fileFilter: fileFilter,    // Qué tipos permitir
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB límite máximo
  }
});

// ============================================
// MIDDLEWARE DE MANEJO DE ERRORES DE MULTER
// ============================================
// Captura y formatea errores de multer
// Casos comunes:
// - LIMIT_FILE_SIZE: Archivo muy grande
// - Tipo de archivo no permitido
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'El archivo es demasiado grande. Máximo 100MB permitido.'
      });
    }
    return res.status(400).json({
      success: false,
      error: `Error al subir archivo: ${err.message}`
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  next();
};

module.exports = {
  upload,
  handleMulterError
};
