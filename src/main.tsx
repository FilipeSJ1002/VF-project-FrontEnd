import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <AuthProvider>
      <BrowserRouter>
        <StrictMode>
          <App/>
        </StrictMode>
      </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
);