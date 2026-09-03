import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './index.css'
import AuthProvider from './context/AuthProvider.jsx';
import router from './routes/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
