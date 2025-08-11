import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {PaginationContextProvider} from './context/PaginationContextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>  
   <PaginationContextProvider>
    <App />
   </PaginationContextProvider>
  </StrictMode>,
)
