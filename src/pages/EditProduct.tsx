import { AbsoluteCenter, Box, Center, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonConfig from "../components/ButtonConfig";
import useAlertToast from "../components/toastUtils";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({ name: "", description: "", price: 0, quantity: 0, status: "", reservedBy: null });
  const { alertToast } = useAlertToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduct(response.data);
      } catch {
        alertToast('Erro ao buscar o produto.', '', 'error');
      }
    };

    fetchProduct();
  }, [id]);

  const hadleBack = () => {
    navigate('/user-products')
  }

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alertToast("Produto atualizado com sucesso.", '', "success");
      navigate("/user-products");
    } catch {
      alertToast("Erro ao atualizar produto.", '', "error");
    }
  };

  return (
    <Box>
      <AbsoluteCenter borderStyle={'solid'} borderRadius={'md'} borderColor={'black'} border={'2px'} p={'10px'}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <Input
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Preço</FormLabel>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Quantidade</FormLabel>
          <Input
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: +e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            value={product.status}
            onChange={(e) => {
              const newStatus = e.target.value;
              setProduct({
                ...product,
                status: newStatus,
                reservedBy: newStatus === "available" ? null : product.reservedBy
              });
            }}
          >
            <option value="">Selecione o status</option>
            <option value="reserved">Reservado</option>
            <option value="available">Disponivel</option>
          </Select>
        </FormControl>
        
        <Center p={'10px'}>
          <Box p={'5px'}><ButtonConfig text="Voltar" onClick={hadleBack} /></Box>
          <Box p={'5px'}><ButtonConfig text="Salvar" onClick={handleSave} /></Box>
        </Center>
      </AbsoluteCenter>
    </Box>
  );
}

export default EditProduct;
