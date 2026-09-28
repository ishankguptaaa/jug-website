import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/raleway'; 
import '@fontsource/raleway/600.css'; 
import '@fontsource/raleway/500.css'; 
import '@fontsource/raleway/700.css'; 
import '@fontsource/roboto'; 
import '@fontsource/archivo-black';
import 'aos/dist/aos.css';

// AOS is initialised in SiteLayout (client-side effect, honours reduced motion).
// Font Awesome CSS is imported by the only page that uses it (CDJ 2025).

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
