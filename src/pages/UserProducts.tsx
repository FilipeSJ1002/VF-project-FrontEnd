import { Box, Center, Flex, VStack, Text, Spinner, Button, useToast, AbsoluteCenter } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import FooterProducts from "../components/FooterProducts";
import { useNavigate } from "react-router-dom";
import ButtonConfigMini from "../components/ButtonConfigMini";
import useAlertToast from "../components/toastUtils";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: string;
  reservedBy: string;
}

function UserProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { alertToast } = useAlertToast();
  const navigate = useNavigate();

  const fetchUserProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data);
    } catch {
      alertToast("Erro ao carregar os produtos. Entre novamente.", '', 'error');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    toast({
      title: "Tem certeza que deseja remover este produto?",
      description: "Esta ação não poderá ser desfeita.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
      render: ({ onClose }) => (
        <Box p={4} bg="white" boxShadow="md" borderRadius="md">
          <Text mb={2}>Tem certeza que deseja remover este produto?</Text>
          <Flex justifyContent="space-between">
            <Button
              size="sm"
              colorScheme="red"
              onClick={async () => {
                try {
                  await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  });
                  alertToast("Produto removido com sucesso.", '', "success");
                  setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productId)
                  );
                } catch {
                  alertToast("Erro ao remover o produto.", "Por favor, tente novamente.", "error");
                }
                onClose();
              }}
            >
              Confirmar
            </Button>
            <Button size="sm" onClick={onClose}>
              Cancelar
            </Button>
          </Flex>
        </Box>
      ),
    });
  };

  const handleEdit = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  return (
    <Box>
      <AbsoluteCenter mt={'80px'}>
        <Center p={'5px'}>
          <VStack spacing={4} w="100%">
            {loading ? (
              <Spinner size="xl" />
            ) : products.length === 0 ? (
              <Text>Nenhum produto cadastrado.</Text>
            ) : (
              <Flex wrap="wrap" justify="center" gap={4}>
                {products.map((product) => (
                  <Box
                    key={product._id}
                    border="1px solid"
                    borderRadius="md"
                    p={4}
                    w="300px"
                    position="relative"
                  >
                    <Text fontWeight="bold">{product.name}</Text>
                    <Text>{product.description}</Text>
                    <Text>Preço: R$ {product.price}</Text>
                    <Text>Quantidade: {product.quantity}</Text>
                    {product.status === 'reserved' ? (
                      <Box>
                        <Text>
                          Status: <Text as="span" color="red">{product.status}</Text>
                        </Text>
                        <Text>
                          Reservado pelo ID: {product.reservedBy}
                        </Text>
                      </Box>
                    ) : (
                      <Text>
                        Status: <Text as="b">{product.status}</Text>
                      </Text>
                    )}
                    <Flex mt={4} gap={2}>
                      <ButtonConfigMini text="Editar" onClick={() => handleEdit(product._id)} />
                      <ButtonConfigMini text="Remover" onClick={() => handleDelete(product._id)} />
                    </Flex>
                  </Box>
                ))}
              </Flex>
            )}
          </VStack>
        </Center>
        <Center p={'5px'}><FooterProducts /></Center>
      </AbsoluteCenter>
    </Box>
  );
}

export default UserProducts;
