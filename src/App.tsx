import { Flex, Stack } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LoginOrRegister from "./pages/LoginOrRegister";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductRegister from './pages/ProductRegister';
import ProductList from './pages/ProductList';
import UserProducts from './pages/UserProducts';
import EditProduct from './pages/EditProduct';
import ReservedProducts from './pages/ReservedProducts';
import UserEdit from './pages/UserEdit';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function App() {

  return (
    <Flex>
      <Stack id="page" minH={'73vh'}>
        <Routes>  
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginOrRegister/>} />
          <Route path="/forgot_password" element={<ForgotPassword/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/product-register" element={<ProtectedRoutes><ProductRegister/></ProtectedRoutes>} />
          <Route path="/product-list" element={<ProtectedRoutes><ProductList/></ProtectedRoutes>} />
          <Route path="/user-products" element={<ProtectedRoutes><UserProducts/></ProtectedRoutes>} />
          <Route path="/edit-product/:id" element={<ProtectedRoutes><EditProduct/></ProtectedRoutes>} />
          <Route path="/reserved-products" element={<ProtectedRoutes><ReservedProducts/></ProtectedRoutes>} />
          <Route path="/user-edit" element={<ProtectedRoutes><UserEdit/></ProtectedRoutes>} />
          <Route path="/about" element={<ProtectedRoutes><AboutUs/></ProtectedRoutes>} />
          <Route path="/contact" element={<ProtectedRoutes><Contact/></ProtectedRoutes>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Stack>
    </Flex>
  );
}

export default App;
