import {
  Box,
  Center,
  Flex,
  Text,
  Spinner,
  useToast,
  AbsoluteCenter
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import FooterProducts from "../components/FooterProducts";
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

const ReservedProducts = () => {
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
      const response = await axios.get<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/products/products?status=reserved`, {
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

  const cancelReserve = async (productId: string) => {
    if (!token) {
      alertToast("Erro ao reservar o produto.", "Usuário não autenticado. Faça login para continuar.", "error");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}/available`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      const updatedProduct = response.data.product;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? updatedProduct : product
        )
      );

      alertToast("Reserva cancelada com sucesso.", '', "success");
    } catch {
      alertToast("Erro ao cancelar reserva.", "Por favor, tente novamente.", "error");
    }
  };


  useEffect(() => {
    fetchUserId().then(fetchProducts);
  }, []);

  return (
    <Box>
      <AbsoluteCenter>
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
              Nenhum produto reservado.
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
                  <Box pt={'5px'}><ButtonConfigMini text="Cancelar reserva" onClick={() => { cancelReserve(product._id) }} /></Box>
                </Box>
              ))}
            </Flex>
          )}
        </Center>
        <Center><FooterProducts /></Center>
      </AbsoluteCenter>
    </Box>
  );
};

export default ReservedProducts;
