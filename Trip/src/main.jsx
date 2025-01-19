import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './My Components/CreateTrip'
import Header from './My Components/Header'
import { Toaster } from './components/ui/toaster'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './My Components/ViewTrip/[tripid]'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header/>
        <Toaster/>
        <RouterProvider router = {router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
