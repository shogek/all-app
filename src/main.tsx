import { StrictMode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
)
