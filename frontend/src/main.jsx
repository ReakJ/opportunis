import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './index.css'
import AuthProvider from './context/AuthProvider.jsx';
import OnboardingProvider from './context/OnboardingProvider.jsx';
import router from './routes/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OnboardingProvider>
        <Toaster />
        <RouterProvider router={router}/>
      </OnboardingProvider>
    </AuthProvider>
  </StrictMode>,
)
