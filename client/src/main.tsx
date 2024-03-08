import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CssBaseline } from '@mui/material';

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <CssBaseline />
    </QueryClientProvider>
  </React.StrictMode>
);
