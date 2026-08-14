
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';

console.log("System: Initiating React Application...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Root element '#root' not found.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </React.StrictMode>
    );
    console.log("System: Render successfully initiated.");
  } catch (err) {
    console.error("System: Critical Render Error", err);
    const errorDisplay = document.getElementById('error-display');
    if (errorDisplay) {
      errorDisplay.style.display = 'block';
      errorDisplay.innerHTML = `<h1>Critical Error</h1><pre>${err instanceof Error ? err.stack : String(err)}</pre>`;
    }
  }
}
