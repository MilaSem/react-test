import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { App } from './components/App.tsx';
import { ErrorPage } from './components/ErrorPage/ErrorPage.tsx';
import { Card } from './components/Card/Card.tsx';
import { NothingFound } from './components/NothingFound/NothingFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Card />,
      },
    ],
  },
  {
    path: '*',
    element: <NothingFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
