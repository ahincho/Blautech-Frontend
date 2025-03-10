import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import StoreContextProvider from './contexts/StoreContext.jsx'
import { AuthenticationContextProvider } from './contexts/AuthenticationContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthenticationContextProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </AuthenticationContextProvider>
  </BrowserRouter>,
)
