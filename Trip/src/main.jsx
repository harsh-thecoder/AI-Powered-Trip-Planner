import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './My Components/CreateTrip'
import Header from './My Components/Header'
import { Toaster } from './components/ui/toaster'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Toaster/>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
