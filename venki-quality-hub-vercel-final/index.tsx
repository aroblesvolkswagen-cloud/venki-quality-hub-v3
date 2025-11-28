import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (typeof globalThis.process === 'undefined') {
  (globalThis as unknown as { process: { env: Record<string, string> } }).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento root');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
