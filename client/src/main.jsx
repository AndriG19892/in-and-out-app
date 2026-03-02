import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// LOGICA PER AGGIORNAMENTO PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Viene attivato solo se esiste già una versione precedente
              if (window.confirm("Nuova versione disponibile! Ricaricare l'app per aggiornare?")) {
                window.location.reload();
              }
            }
          }
        };
      };
    }).catch(err => console.error('Errore Service Worker:', err));
  });
}
