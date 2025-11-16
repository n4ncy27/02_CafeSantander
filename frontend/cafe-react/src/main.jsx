// ============================================
// MAIN.JSX - PUNTO DE ENTRADA DE LA APLICACIÓN
// ============================================
// REQUERIMIENTO: Inicialización de React con Router
// Responsabilidades:
// - Montar la aplicación React en el DOM (#root)
// - Configurar React Router (BrowserRouter)
// - Importar estilos globales (Bootstrap, CSS personalizados)
// - Envolver App en StrictMode para validaciones de desarrollo

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ============================================
// IMPORTACIÓN DE ESTILOS GLOBALES
// ============================================
import 'bootstrap/dist/css/bootstrap.min.css'  // Framework Bootstrap 5
import './index.css'                            // Estilos base de la aplicación
import './styles/global.css'                    // Estilos globales personalizados
import App from './App.jsx'

// ============================================
// RENDERIZADO DE LA APLICACIÓN
// ============================================
// 1. createRoot: API moderna de React 18
// 2. StrictMode: Detecta problemas en desarrollo
// 3. BrowserRouter: Habilita routing con React Router
// 4. App: Componente raíz con todas las rutas
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
