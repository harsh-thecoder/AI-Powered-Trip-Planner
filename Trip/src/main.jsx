import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './My Components/CreateTrip';
import Header from './My Components/Header';
import { Toaster } from './components/ui/toaster';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './My Components/ViewTrip/[tripid]';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header /> {/* Place Header here so it is inside Router context */}
        <App />
      </>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
);
