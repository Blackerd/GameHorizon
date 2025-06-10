import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext.jsx';
import { CustomerProvider } from './context/CustomerContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CustomerProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CustomerProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);