import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './rightSide.css'
import './leftSide.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
