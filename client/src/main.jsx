import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import './index.css';
import './styles/app.css';
import './styles/profile.css';
import './styles/connections.css';
import './styles/discovery.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><AuthProvider><App /><Toaster position="top-right" /></AuthProvider></BrowserRouter></StrictMode>,
);
