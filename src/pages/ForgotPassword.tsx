import { Box, Center, Text, AbsoluteCenter } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonConfig from "../components/ButtonConfig";
import InputConfig from "../components/InputConfig";
import useAlertToast from "../components/toastUtils";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();
    const { alertToast } = useAlertToast();

    const Submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, { email });
            alertToast('Sucesso!', response.data.message, 'success');
            setEmailSent(true);
        } catch {
           alertToast('Erro, tente novamente mais tarde.', '', 'error'); 
        }

        setIsLoading(false);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <Center>
            <Box>
                {!emailSent ? (
                    <AbsoluteCenter>
                        <form onSubmit={Submit}>
                            <Box p={'10px 0px'}>
                                <InputConfig
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box p={'10px'}>
                                <ButtonConfig
                                    width="250px"
                                    text='Enviar E-mail de Redefinição'
                                    type="submit"
                                    isLoading={isLoading}
                                    isDisabled={email === ''}
                                />
                            </Box>
                            <Box p={'10px'}>
                                <Center>
                                    <ButtonConfig
                                        text='Voltar para o login'
                                        isLoading={isLoading}
                                        onClick={goToLogin}
                                    />
                                </Center>
                            </Box>
                        </form>
                    </AbsoluteCenter>
                ) : (
                    <AbsoluteCenter>
                        <Box textAlign={'center'}>
                            <Text mb={4}>Um e-mail com a nova senha foi enviado. Por favor, verifique sua caixa de entrada.</Text>
                            <ButtonConfig text='Voltar ao Login' onClick={goToLogin} />
                        </Box>
                    </AbsoluteCenter>
                )}
            </Box>
        </Center>
    );
}

export default ForgotPassword;
