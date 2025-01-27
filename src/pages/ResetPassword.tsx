import { AbsoluteCenter, Box, Center, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonConfig from "../components/ButtonConfig";
import useAlertToast from "../components/toastUtils";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [isLoading, setIsLoading] = useState(false);
    const { alertToast } = useAlertToast();
    const navigate = useNavigate();

    const newPassConfirm = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/confirm`, null, { params: { email } });
            alertToast('Sucesso!', response.data.message, 'success');
        } catch {
            alertToast('Erro, tente novamente mais tarde.', '', 'error');
        }
        setIsLoading(false);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <Flex>
            <Center>
                <Box textAlign="center">
                    {email ? (
                        <AbsoluteCenter>
                            <Box textAlign={'center'}>
                                <Text mb={4}>Estamos prontos para redefinir sua senha. Clique no botão abaixo para confirmar.</Text>
                                <ButtonConfig width="300px" text={'Confirmar Redefinição de Senha'} onClick={newPassConfirm} isLoading={isLoading} />
                            </Box>
                        </AbsoluteCenter>
                    ) : (
                        <AbsoluteCenter>
                            <Box textAlign={'center'}>
                                <Text mb={4}>Link de redefinição de senha inválido.</Text>
                                <ButtonConfig text={'Voltar ao Login'} onClick={goToLogin} />
                            </Box>
                        </AbsoluteCenter>
                    )}
                </Box>
            </Center>
        </Flex>
    );
}

export default ResetPassword;
