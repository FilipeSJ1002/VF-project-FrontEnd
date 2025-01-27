import { AbsoluteCenter, Box, Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import Footer from "../components/Footer";
import { useState } from "react";
import InputConfig from "../components/InputConfig";
import ButtonConfig from "../components/ButtonConfig";
import axios from "axios";
import useAlertToast from "../components/toastUtils";
import { useNavigate } from "react-router-dom";

function UserEdit() {
    const [assistant, setAssistant] = useState(false);
    const { alertToast } = useAlertToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailLoginInputValue, setEmailLoginInputValue] = useState('');
    const [passwordLoginInputValue, setPasswordLoginInputValue] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checkNewPassword, setCheckNewPassword] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }
    
    const noPassword = () => {
        alertToast('Senhas não conferem', '', 'error');
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            name: newName || undefined, 
            password: newPassword || undefined, 
        };
    
        try {
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}/update`, updatedData);
            alertToast('Cadastro atualizado!', '', 'success');
            goToHome();
        } catch {
            alertToast('Erro, tente novamente!', 'Atualização não realizada!', 'error');
        }
    };
    

    const loginSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
            setUserId(dataId.data.id);
            setName(user.name);
            setEmail(emailLoginInputValue);
            setAssistant(true);
            alertToast("Logado com sucesso!", '', 'success');
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
    }

    return(
        <Flex>
            <AbsoluteCenter mt={'80px'} padding={'35px'} border={'2px'} boxShadow={'0 7px 8px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2)'}>
            {assistant ? (
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Text fontSize={'3xl'}>Editar Perfil:</Text>
                            <Text fontSize={'lg'}>Dados atuais:</Text>
                            <Text>
                                Nome: {name}
                                <br/>
                                Email: {email}
                            </Text>
                            <InputConfig
                                placeholder="Nome"
                                value={newName}
                                onChange={(e) => { setNewName(e.target.value) }}
                            />
                            <InputConfig
                                placeholder="Nova Senha"
                                type="password"
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value) }}
                            />
                            <InputConfig
                                placeholder="Confirmar Nova Senha"
                                type="password"
                                value={checkNewPassword}
                                onChange={(e) => { setCheckNewPassword(e.target.value) }}
                            />
                            {newPassword === checkNewPassword ? (
                                <ButtonConfig type="submit" text="Salvar" isDisabled={newName === '' && newPassword === '' && checkNewPassword === ''}/>
                            ):(
                                <ButtonConfig text="Salvar" onClick={noPassword}/>
                            )}
                        </form>
                    </Box>
                ) : (
                    <form onSubmit={loginSubmit}>
                        <Text fontSize={'3xl'}>Faça login para continuar</Text>
                        <Box><Text>Email:</Text> <Text><InputConfig placeholder="Email" value={emailLoginInputValue} onChange={(e) => { setEmailLoginInputValue(e.target.value) }} /></Text></Box>
                        <Box><Text>Senha:</Text> <Text><InputConfig placeholder="Senha" type="password" value={passwordLoginInputValue} onChange={(e) => { setPasswordLoginInputValue(e.target.value) }} /></Text></Box>
                        <Box p={'10px 0px'}><ButtonConfig type="submit" text="Entrar" isDisabled={emailLoginInputValue === '' || passwordLoginInputValue === ''} /></Box>
                    </form>
                )}
                <Box pt={'15px'}><Center><Footer/></Center></Box>
            </AbsoluteCenter>
        </Flex>
    );
}

export default UserEdit;
