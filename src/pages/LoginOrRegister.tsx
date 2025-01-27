import { AbsoluteCenter, Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import ButtonConfig from "../components/ButtonConfig";
import InputConfig from "../components/InputConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import useAlertToast from "../components/toastUtils";

function LoginOrRegister(){
    const [nameInputValue, setNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [emailLoginInputValue, setEmailLoginInputValue] = useState('');
    const [passwordLoginInputValue, setPasswordLoginInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [cofirmPasswordInputValue, setCofirmPasswordInputValue] = useState('');
    const {setIsAuthenticated, setToken} = useAuth()
    const { alertToast } = useAlertToast();
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }
    const gotToForgotPassword = () => {
        navigate('/forgot_password')
    }

    const [loading, setLoading] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);

    const loginSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoadingLogin(true);
        const userData = {
            email: emailLoginInputValue,
            password: passwordLoginInputValue
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, userData);
            const dataBase = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/info-login`, userData);
            const dataId = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/info-login-id`, userData);
            const user = {
                id: dataId.data.id,
                name: dataBase.data.name,
            };
            
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_name', user.name);
            setIsAuthenticated(response.data.access_token? true:false)
            setToken(response.data.access_token)
            alertToast("Logado com sucesso!", `Bem vindo ${user.name}`, 'success');
            goToHome()
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alertToast(`Erro: e-mail ou senha incorreto`, '', 'error');
                } else if (error.request) {
                    alertToast('Erro de rede. Nenhuma resposta do servidor.', '', 'error');
                }
            } else {
                alertToast(`Erro de conexão, tente novamente mais tarde!`, '', 'error');
            }
        }
        setLoadingLogin(false);
    }

    const registerSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        const userData = {
            name: nameInputValue,
            email: emailInputValue,
            password: passwordInputValue,
        };

        if (passwordInputValue!== cofirmPasswordInputValue) {
            alertToast("Senhas não conferem!", '', 'error');
            return;
        }
        else if (passwordInputValue === cofirmPasswordInputValue){
            try { 
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData);
                alertToast("Cadastro realizado com sucesso!", '', 'success');
                setNameInputValue('');
                setEmailInputValue('');
                setPasswordInputValue('');
                setCofirmPasswordInputValue('');
            } catch (error: any) {
                if(error.response.status === 409){
                    alertToast("Email já cadastrado!", '', 'error');
                    return navigate('/login');
                } 
                if (axios.isAxiosError(error)) {
                    alertToast('Erro de rede. Tente novamente mais tarde!', '', 'error');
                } else {
                    alertToast(`Erro desconhecido. Tente novamente mais tarde!`, '', 'error');    
                }
            }
            setLoading(false);
        }

    }
    
    return(
        <Flex>
            <AbsoluteCenter>
            <Box>
                <Flex mt={'180px'} justifyContent={'space-between'} border={'2px'}>
                    <Box p={'20px'} justifyContent={'space-between'}>
                        <Center>
                            <form onSubmit={loginSubmit}>
                                <Text fontSize={'3xl'} p={'5px'}>Login</Text>
                                <Box><Text>Email:</Text> <Text><InputConfig placeholder="Email" value={emailLoginInputValue} onChange={(e) => { setEmailLoginInputValue(e.target.value) }} /></Text></Box>
                                <Box><Text>Senha:</Text> <Text><InputConfig placeholder="Senha" type="password" value={passwordLoginInputValue} onChange={(e) => { setPasswordLoginInputValue(e.target.value) }} /></Text></Box>
                                <Box p={'10px 0px'}><ButtonConfig type="submit" text="Entrar" isLoading={loadingLogin} isDisabled={emailLoginInputValue === '' || passwordLoginInputValue === ''} /></Box>
                            </form>
                        </Center>
                        <Link 
                        color={'#5e5e5e'} 
                        textDecoration={'underline'}
                        fontSize={'small'}
                        onClick={gotToForgotPassword}
                        >
                        Esqueceu sua senha?
                        </Link>
                    </Box>
                    <Box p={'20px'}>
                        <Center>
                            <form onSubmit={registerSubmit}>
                                <Text fontSize={'3xl'} p={'5px'}>Cadastrar</Text>
                                <Box>
                                    <Box><Text>Nome:</Text> <Text><InputConfig placeholder="Nome" value={nameInputValue} onChange={(e) => { setNameInputValue(e.target.value) }} /></Text></Box>
                                    <Box><Text>Email:</Text> <Text><InputConfig placeholder="Email" value={emailInputValue} onChange={(e) => { setEmailInputValue(e.target.value) }} /></Text></Box>
                                </Box>
                                <Box>
                                    <Box><Text>Senha:</Text> <Text><InputConfig placeholder="Senha" type="password" value={passwordInputValue} onChange={(e) => { setPasswordInputValue(e.target.value) }} /></Text></Box>
                                    <Box><Text>Confirmar Senha:</Text> <Text><InputConfig placeholder="Confirmar senha" type="password" value={cofirmPasswordInputValue} onChange={(e) => { setCofirmPasswordInputValue(e.target.value) }} /></Text></Box>
                                    
                                </Box>
                                <Box paddingTop={'10px'}><ButtonConfig type="submit" text="Cadastrar" isLoading={loading} isDisabled={nameInputValue === '' || emailInputValue === '' || passwordInputValue === '' || cofirmPasswordInputValue === ''} /></Box>
                            </form>
                        </Center>
                    </Box>
                </Flex>
                <Center><Box paddingTop={'10px'}><ButtonConfig onClick={goToHome} text="Voltar para o início" /></Box></Center>
            </Box>
            </AbsoluteCenter>
        </Flex>
    )
}

export default LoginOrRegister;