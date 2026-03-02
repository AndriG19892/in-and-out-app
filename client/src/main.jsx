// main.jsx
import React from 'react';
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

// LOGICA PER AGGIORNAMENTO PWA (Infallibile con Alert)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      // Controlla se c'è un aggiornamento in corso
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Se esiste già una versione precedente, chiedi conferma per la nuova
            const hasUpdate = window.confirm(
              "Aggiornamento disponibile! 🚀\n\nClicca OK per caricare l'ultima versione di In&Out e sincronizzare i dati."
            );
            
            if (hasUpdate) {
              window.location.reload();
            }
          }
        };
      };
    }).catch(err => console.error('Errore SW:', err));
  });
}
