import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { DiabetesProvider } from '../context/DiabetesContext.jsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DiabetesProvider>
        <App />
      </DiabetesProvider>
    </AuthProvider>
    <Analytics/>
  </StrictMode>,
)
