import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './components/app/store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
    </Provider>
  </StrictMode>
);
