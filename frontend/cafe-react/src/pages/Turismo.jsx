// ============================================
// TURISMO.JSX - PÁGINA DE TURISMO Y CULTURA CAFETERA
// ============================================
// REQUERIMIENTO: Promoción turística de la región
// Contenido:
// - Lugares turísticos emblemáticos de Santander
// - Relación de cada lugar con el café local
// - Galería de imágenes con modal de vista ampliada
// - Sistema de carga de archivos multimedia
// - Integración con backend para gestión de archivos

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/turismo.css';
import axios from 'axios';

const Turismo = () => {
  // ============================================
  // ESTADO LOCAL
  // ============================================
  const [selectedImage, setSelectedImage] = useState(null);      // Imagen seleccionada para modal
  const [imageLoaded, setImageLoaded] = useState({});            // Control de carga de imágenes
  const [archivosTurismo, setArchivosTurismo] = useState([]);    // Archivos de /public/turismo
  const [archivosSubidos, setArchivosSubidos] = useState([]);    // Archivos subidos por usuarios
  const [uploading, setUploading] = useState(false);             // Estado de carga de archivo
  const [uploadMessage, setUploadMessage] = useState('');        // Mensaje de resultado
  const [selectedFile, setSelectedFile] = useState(null);        // Archivo seleccionado
  const [showUploadSection, setShowUploadSection] = useState(false); // Toggle sección de carga

  // ============================================
  // DATOS: Lugares turísticos de Santander
  // ============================================
  // Cada lugar incluye:
  // - Descripción del sitio
  // - Ubicación
  // - Relación con el café de la zona
  const lugares = [
    {
      id: 1,
      nombre: 'Parque Arví',
      descripcion: 'Disfruta de vistas panorámicas espectaculares de la ciudad desde uno de los cable cars más antiguos del mundo. El Parque Arví ofrece senderos, restaurantes y zonas de picnic.',
      ubicacion: 'Bucaramanga - Floridablanca',
      imagen: 'http://localhost:5000/public/turismo/parque_arvi.jpg',
      emoji: '🚠',
      cafeRelacion: 'En esta zona se cultiva café de altura con notas dulces y cítricas, ideal para los amantes del café suave.'
    },
    {
      id: 2,
      nombre: 'Monumento a los Héroes Inmortales',
      descripcion: 'Símbolo icónico de Bucaramanga ubicado en el Parque García Rovira. Este monumento honra a los héroes de la independencia colombiana y es punto de encuentro de la ciudad.',
      ubicacion: 'Centro - Bucaramanga',
      imagen: 'http://localhost:5000/public/turismo/monumento_heroes.jpg',
      emoji: '🗿',
      cafeRelacion: 'A pocas cuadras encontrarás las tradicionales cafeterías del centro donde se sirve café santandereano desde hace décadas.'
    },
    {
      id: 3,
      nombre: 'Cañón del Chicamocha',
      descripcion: 'Uno de los cañones más espectaculares de Colombia con profundidades superiores a 600 metros. Ideal para paragliding, senderismo y disfrutar de la naturaleza salvaje.',
      ubicacion: 'Área Metropolitana - Santander',
      imagen: 'http://localhost:5000/public/turismo/chicamocha_canyon.jpg',
      emoji: '⛰️',
      cafeRelacion: 'En las laderas del cañón crecen cafetales que producen granos con sabor intenso y cuerpo robusto, perfectos para espresso.'
    }
  ];

  // ============================================
  // EFECTO: Cargar archivos desde backend
  // ============================================
  // Al montar, carga:
  // 1. Archivos de /public/turismo (GET /api/archivos/turismo)
  // 2. Archivos subidos por usuarios (GET /api/archivos/uploads)
  useEffect(() => {
    const cargarArchivos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/archivos/turismo');
        if (response.data.success) {
          setArchivosTurismo(response.data.data);
        }
      } catch (error) {
        console.error('Error al cargar archivos de turismo:', error);
      }
    };

    const cargarArchivosSubidos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/archivos/uploads');
        if (response.data.success) {
          setArchivosSubidos(response.data.data);
        }
      } catch (error) {
        console.error('Error al cargar archivos subidos:', error);
      }
    };

    cargarArchivos();
    cargarArchivosSubidos();
  }, []);

  // ============================================
  // HANDLER: Selección de archivo
  // ============================================
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadMessage('');
    }
  };

  // ============================================
  // HANDLER: Subir archivo al servidor
  // ============================================
  // Endpoint: POST /api/archivos/upload
  // Body: FormData con el archivo
  // Backend guarda en /public/uploads
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Por favor selecciona un archivo');
      return;
    }

    setUploading(true);
    setUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:5000/api/archivos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUploadMessage(`✅ Archivo "${response.data.data.originalName}" subido exitosamente`);
        setSelectedFile(null);
        // Recargar lista de archivos subidos
        const updatedFiles = await axios.get('http://localhost:5000/api/archivos/uploads');
        if (updatedFiles.data.success) {
          setArchivosSubidos(updatedFiles.data.data);
        }
      }
    } catch (error) {
      console.error('Error al subir archivo:', error);
      setUploadMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Descargar archivo
  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/archivos/download/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar archivo:', error);
      alert('Error al descargar el archivo');
    }
  };

  // Eliminar archivo
  const handleDelete = async (filename) => {
    if (!confirm(`¿Estás seguro de eliminar "${filename}"?`)) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/archivos/delete/${filename}`);
      if (response.data.success) {
        alert('Archivo eliminado exitosamente');
        // Recargar lista
        const updatedFiles = await axios.get('http://localhost:5000/api/archivos/uploads');
        if (updatedFiles.data.success) {
          setArchivosSubidos(updatedFiles.data.data);
        }
      }
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      alert('Error al eliminar el archivo');
    }
  };

  // Verificar que el backend está disponible
  useEffect(() => {
    const verificarBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ping');
        if (!response.ok) {
          console.warn('Backend no está completamente disponible');
        }
      } catch (error) {
        console.warn('No se pudo conectar al backend:', error);
      }
    };
    verificarBackend();
  }, []);

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  const openLightbox = (imagen) => {
    setSelectedImage(imagen);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Header />
      <div className="turismo-page">
        {/* Hero Section */}
        <div className="turismo-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>☕ Café & Turismo en Bucaramanga</h1>
            <p className="hero-subtitle">Donde el café excepcional se encuentra con paisajes inolvidables</p>
            <p className="hero-description">
              Descubre los lugares que hacen de Santander la tierra del mejor café colombiano
            </p>
          </div>
        </div>

        <div className="info-banner">
          <div className="banner-icon">☕</div>
          <div className="banner-content">
            <strong>Café de Altura Santandereana:</strong> 
            <p>Bucaramanga y su área metropolitana son cuna de café premium cultivado entre 1,200 y 1,800 metros sobre el nivel del mar. 
            Cada destino turístico está rodeado de cafetales que producen los granos que servimos en Café Santander.</p>
          </div>
        </div>

      <div className="turismo-gallery">
        {lugares.map((lugar) => (
          <div key={lugar.id} className="turismo-card">
            <div 
              className="turismo-image-container"
              onClick={() => openLightbox(lugar.imagen)}
            >
              <img 
                src={lugar.imagen} 
                alt={lugar.nombre}
                className="turismo-image"
                loading="lazy"
                onLoad={() => handleImageLoad(lugar.id)}
                onError={() => console.error(`Error al cargar imagen: ${lugar.nombre}`)}
              />
              <div className="image-overlay">
                <span className="zoom-icon">🔍 Ver en grande</span>
              </div>
            </div>
            <div className="turismo-content">
              <h2 className="turismo-title">
                <span className="turismo-emoji">{lugar.emoji}</span>
                {lugar.nombre}
              </h2>
              <p className="turismo-description">{lugar.descripcion}</p>
              <div className="turismo-location">
                📍 {lugar.ubicacion}
              </div>
              
              {/* Conexión con el café */}
              <div className="cafe-connection">
                <div className="cafe-icon">☕</div>
                <p className="cafe-text">{lugar.cafeRelacion}</p>
              </div>

              <div className="turismo-actions">
                <button 
                  className="btn-view-image"
                  onClick={() => openLightbox(lugar.imagen)}
                >
                  Ver Imagen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            <img src={selectedImage} alt="Vista ampliada" />
          </div>
        </div>
      )}

      {/* Sección de Subir Archivos */}
      <div className="upload-section">
        <div className="upload-header">
          <h2>📤 Gestión de Archivos Turísticos</h2>
          <p>Sube imágenes, videos o documentos relacionados con el turismo de Bucaramanga</p>
          <button 
            className="toggle-upload-btn"
            onClick={() => setShowUploadSection(!showUploadSection)}
          >
            {showUploadSection ? '▼ Ocultar Subir Archivo' : '▶ Mostrar Subir Archivo'}
          </button>
        </div>

        {showUploadSection && (
          <div className="upload-form">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileSelect}
                accept="image/*,video/*,.pdf,.txt,.doc,.docx"
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-label">
                {selectedFile ? `📄 ${selectedFile.name}` : '📁 Seleccionar Archivo'}
              </label>
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="upload-btn"
            >
              {uploading ? '⏳ Subiendo...' : '⬆️ Subir Archivo'}
            </button>

            {uploadMessage && (
              <div className={`upload-message ${uploadMessage.includes('✅') ? 'success' : 'error'}`}>
                {uploadMessage}
              </div>
            )}

            <div className="upload-info">
              <p><strong>Formatos permitidos:</strong></p>
              <ul>
                <li>📷 Imágenes: JPG, PNG, GIF, WEBP</li>
                <li>🎥 Videos: MP4, WEBM, MOV</li>
                <li>📄 Documentos: PDF, TXT, DOC, DOCX</li>
              </ul>
              <p><strong>Tamaño máximo:</strong> 100 MB</p>
            </div>
          </div>
        )}

        {/* Lista de archivos subidos */}
        {archivosSubidos.length > 0 && (
          <div className="uploaded-files">
            <h3>📂 Archivos Subidos ({archivosSubidos.length})</h3>
            <div className="files-grid">
              {archivosSubidos.map((archivo, index) => (
                <div key={index} className="file-card">
                  <div className="file-preview">
                    {archivo.filename.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <img 
                        src={`http://localhost:5000${archivo.url}`} 
                        alt={archivo.filename}
                        className="file-thumbnail"
                      />
                    ) : archivo.filename.match(/\.(mp4|webm)$/i) ? (
                      <video 
                        src={`http://localhost:5000${archivo.url}`}
                        className="file-thumbnail"
                        controls
                      />
                    ) : (
                      <div className="file-icon">📄</div>
                    )}
                  </div>
                  <div className="file-info">
                    <p className="file-name" title={archivo.filename}>{archivo.filename}</p>
                    <p className="file-size">{(archivo.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="file-actions">
                    <button
                      onClick={() => handleDownload(archivo.filename)}
                      className="btn-download-file"
                      title="Descargar"
                    >
                      ⬇️
                    </button>
                    <button
                      onClick={() => handleDelete(archivo.filename)}
                      className="btn-delete-file"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para probar nuestro café?</h2>
          <p>Los mismos granos cultivados en estas hermosas tierras santandereanas</p>
          <Link to="/#productos" className="cta-button">
            Ver Nuestros Productos
          </Link>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default Turismo;
