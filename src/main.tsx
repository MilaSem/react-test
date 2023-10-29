import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
