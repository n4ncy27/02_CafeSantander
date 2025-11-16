// ============================================
// ROUTES/ARCHIVOS.JS - RUTAS DE GESTIÓN DE ARCHIVOS
// ============================================
// REQUERIMIENTO: Sistema de carga y descarga de archivos multimedia
// Funcionalidades:
// - Listar archivos de /uploads y /turismo
// - Subir archivo simple o múltiples archivos
// - Descargar archivo específico
// - Eliminar archivo
// - Validación de tipos de archivo (imágenes, videos, documentos)
// - Límite de tamaño: 100MB por archivo

const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosController');
const { upload, handleMulterError } = require('../middleware/upload');

// ============================================
// RUTAS PÚBLICAS - LISTADO Y DESCARGA
// ============================================

// GET - Listar archivos de uploads
router.get('/uploads', archivosController.listarArchivos);

// GET - Listar archivos de turismo
router.get('/turismo', archivosController.listarArchivosTurismo);

// GET - Descargar archivo específico
router.get('/download/:filename', archivosController.descargarArchivo);

// Rutas que requieren subir archivos

// POST - Subir un solo archivo
router.post(
  '/upload',
  upload.single('file'),
  handleMulterError,
  archivosController.subirArchivo
);

// POST - Subir múltiples archivos
router.post(
  '/upload-multiple',
  upload.array('files', 10), // Máximo 10 archivos
  handleMulterError,
  archivosController.subirArchivos
);

// DELETE - Eliminar archivo
router.delete('/delete/:filename', archivosController.eliminarArchivo);

module.exports = router;
