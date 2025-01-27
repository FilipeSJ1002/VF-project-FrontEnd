import { AbsoluteCenter, Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import ButtonConfig from "../components/ButtonConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const goToLogin = () => {
        return navigate('/login');
    };

    const goToProductList = () => {
        return navigate('/product-list');
    }; 
    
    const goToAbout = () => {
        return navigate('/about');
    };

    const goToContact = () => {
        return navigate('/contact');
    };

    const goToUserEdit = () => {
        return navigate('/user-edit')
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    };

    return (
        <Flex>
            <AbsoluteCenter mt={'50px'}>
                <Center><Box as="header"><Text fontSize={`7xl`}>VF project</Text></Box></Center>
                <Center>
                    <Box>
                        <Flex>
                            <Box>
                                <VStack>
                                    <Text pb={'0px'} textAlign={'center'}>Bem vindo ao sistema VF, entre agora ou faça seu cadastro <br/> comece a vender, reserve e compre</Text>
                                    {isAuthenticated &&
                                        <>
                                        <HStack>
                                            <Box p={'4px'}><ButtonConfig text='Todos os produtos' onClick={goToProductList} /></Box>
                                            <Box p={'4px'}><ButtonConfig text='Editar Perfil' onClick={goToUserEdit} /></Box>
                                        </HStack>
                                        <HStack>    
                                            <Box p={'4px'}><ButtonConfig text='Sobre nós' onClick={goToAbout} /></Box>
                                            <Box p={'4px'}><ButtonConfig text='Contato' onClick={goToContact} /></Box>
                                        </HStack>
                                            <ButtonConfig text='Sair' onClick={logout} />
                                        </>
                                    }
                                    {!isAuthenticated &&
                                        <>
                                            <ButtonConfig text='Entrar ou Cadastrar' onClick={goToLogin} />
                                        </>
                                    }
                                </VStack>
                            </Box>
                        </Flex>
                    </Box>
                </Center>
            </AbsoluteCenter>
        </Flex>
    );
}

export default Home;
