import { AbsoluteCenter, Box, Center, Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import InputConfig from "../components/InputConfig";
import { useState } from "react";
import TextareaConfig from "../components/TextareaConfig";
import FooterProducts from "../components/FooterProducts";
import ButtonConfig from "../components/ButtonConfig";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAlertToast from "../components/toastUtils";


function ProductRegister() {
    const [nameInputValue, setNameInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [priceInputValue, setPriceInputValue] = useState('');
    const [quantityInputValue, setQuantityInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const inputSize = "400px";
    const { alertToast } = useAlertToast();


    const submitProduct = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);

        const price = parseFloat(priceInputValue);
        const quantity = parseInt(quantityInputValue, 10);

        if (isNaN(price) || isNaN(quantity)) {
            alertToast('Preço e Quantidade devem ser números válidos.', '', 'error');
            setLoading(false);
            return;
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
            alertToast('Token não encontrado. Faça login novamente.', '', 'error');
            setLoading(false);
            return;
        }

        let ownerId = '';
        try {
            const decodedToken: any = jwtDecode(token);
            ownerId = decodedToken.sub;
            if (!ownerId) alertToast('ID não encontrado no token', '', 'error');
        } catch {
            alertToast('Erro ao processar informações do usuário. Faça login novamente.', '', 'error');
            setLoading(false);
            return;
        }

        const productData = {
            name: nameInputValue,
            description: descriptionInputValue,
            price: price,
            quantity: quantity,
            ownerId: ownerId
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            alertToast(`Produto ${productData.name} criado com sucesso!`, '', 'success');
            setNameInputValue('');
            setDescriptionInputValue(''); 
            setPriceInputValue(''); 
            setQuantityInputValue('');
        } catch {
            alertToast('Erro ao cadastrar o produto', '', 'error');
        }
        setLoading(false);
    };

    return (
        <div>
            <AbsoluteCenter mt={'60px'}>
                <Box>
                    <form onSubmit={submitProduct}>
                        <Flex borderStyle={'solid'} borderColor={'black'} border={'2px'} p={'10px'}>
                            <VStack>
                                <Box>
                                    <Text fontSize={'lg'} borderBottom={'1px'}>Cadastro de produtos</Text>
                                </Box>
                                <Box>
                                    <VStack>
                                        <Box>
                                            <Text>Nome:</Text><InputConfig placeholder="Nome" width={inputSize} value={nameInputValue} onChange={(e) => { setNameInputValue(e.target.value) }} />
                                        </Box>
                                        <Box>
                                            <Text>Descrição:</Text><TextareaConfig placeholder="Descrição" width={inputSize} height="100px" value={descriptionInputValue} onChange={(e) => { setDescriptionInputValue(e.target.value) }} />
                                        </Box>
                                        <Box>
                                            <Text>Preço:</Text><InputConfig placeholder="Preço" width={inputSize} value={priceInputValue} onChange={(e) => { setPriceInputValue(e.target.value) }} />
                                        </Box>
                                        <Box>
                                            <Text>Quantidade:</Text><InputConfig placeholder="Quantidade" width={inputSize} value={quantityInputValue} onChange={(e) => { setQuantityInputValue(e.target.value) }} />
                                        </Box>
                                    </VStack>
                                </Box>
                            </VStack>
                        </Flex>
                        <Center><HStack><FooterProducts/><ButtonConfig text='Cadastrar produto' type="submit" isLoading={loading} isDisabled={ nameInputValue === '' || descriptionInputValue === '' || priceInputValue === '' || quantityInputValue === ''} /></HStack></Center>
                    </form>
                </Box>
            </AbsoluteCenter>
        </div>
    );
}

export default ProductRegister;
