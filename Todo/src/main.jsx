import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {SnackbarProvider} from 'notistack'
createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3}>
    <StrictMode>
      <App />
    </StrictMode>
  </SnackbarProvider>
);
