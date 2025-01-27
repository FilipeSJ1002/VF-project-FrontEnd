import {
  Box,
  Center,
  Flex,
  Text,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ButtonConfig from "../components/ButtonConfig";
import ButtonConfigMini from "../components/ButtonConfigMini";
import useAlertToast from "../components/toastUtils";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  ownerId: string;
  reservedBy?: string | null;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { alertToast } = useAlertToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUserId = async () => {
    if (!token) {
      setError("Usuário não autenticado. Faça login para continuar.");
      setLoading(false);
      return;
    }
    try {
      setUserId(localStorage.getItem('user_id'));
    } catch {
      alertToast("Erro ao carregar o ID do usuário.", 'Por favor, tente novamente.', 'error');
    }
  };
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/products?status=reserved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch {
      alertToast("Erro ao carregar os produtos.", 'Por favor, tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (productId: string) => {    
    if (!token) {
      alertToast("Erro ao reservar o produto.", "Usuário não autenticado. Faça login para continuar.", "error");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}/reserve`,
        { reservedBy: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, reservedBy: userId }
            : product
        )
      );
      alertToast("Produto reservado com sucesso.", '', "success");
    } catch {
      alertToast("Erro ao reservar o produto.", "Por favor, tente novamente.", "error");
    }
    
  };


  useEffect(() => {
    fetchUserId().then(fetchProducts);
  }, []);

  return (
    <Box>
      <Center py={4}>
        <Flex gap={4}>
          <ButtonConfig
            text="Registrar produto"
            onClick={() => navigate("/product-register")}
          />
          <ButtonConfig
            text="Meus produtos"
            onClick={() => navigate("/user-products")}
          />
          <ButtonConfig
            text="Produtos reservados"
            onClick={() => navigate("/reserved-products")}
          />
        </Flex>
      </Center>

      <Center py={6}>
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        ) : products.length === 0 ? (
          <Text fontSize="lg" color="gray.600">
            Nenhum produto cadastrado.
          </Text>
        ) : (
          <Flex wrap="wrap" justify="center" gap={6}>
            {products.map((product) => (
              <Box
                key={product._id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                w="300px"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
              >
                <Text fontWeight="bold">{product.name}</Text>
                <Text>{product.description}</Text>
                <Text>Preço: R$ {product.price.toFixed(2)}</Text>
                <Text>Quantidade: {product.quantity}</Text>
                {product.ownerId === userId ? (
                  <Text fontSize="sm" color="blue.500" mt={2}>
                    Seu produto
                  </Text>
                ) : product.reservedBy ? (
                  product.reservedBy === userId ? (
                    <Text fontSize="sm" color="green.500" mt={2}>
                      Reservado por você
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="red.500" mt={2}>
                      Produto reservado
                    </Text>
                  )
                ) : (
                  <Box><ButtonConfigMini text="Reservar" onClick={() => {handleReserve(product._id)} }/></Box>
                )}
              </Box>
            ))}
          </Flex>
        )}
      </Center>
      <Center><Footer/></Center>
    </Box>
  );
};

export default ProductList;
