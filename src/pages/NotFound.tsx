import { AbsoluteCenter, Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ButtonConfig from "../components/ButtonConfig";

function NotFound(){
    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }    

    return(
        <Flex>
            <AbsoluteCenter border={'2px'} boxShadow={'0 7px 8px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2)'}>
                <Box p={'10px'}>
                <Box p={'10px'}>
                    <Center><Heading as="h2" size={'2xl'}>404</Heading></Center>
                    <Center><Heading as='h3'>Página não encontrada!</Heading></Center>
                    <Center><Text>A página que você está procurando não existe</Text></Center>
                </Box>
                <Center><ButtonConfig text="Voltar para o início" onClick={goToHome}/></Center>
                </Box>
            </AbsoluteCenter>          
        </Flex>
    )
}

export default NotFound;