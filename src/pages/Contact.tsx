import { AbsoluteCenter, Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";

function Contact() {

    return (
        <Flex>
            <AbsoluteCenter mt={'80px'} padding={'35px'} border={'2px'} boxShadow={'0 7px 8px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2)'}>
                <Box>
                    <Text fontSize={'3xl'}>Entre em Contato</Text>
                    <Text>
                        Caso precise entrar em contato para dúvidas, sugestões ou qualquer outro motivo,
                        sinta-se à vontade para utilizar as informações abaixo.
                    </Text>
                    <Text fontSize={'2xl'} pt={'20px'}>Informações de Contato</Text>
                    <Text>Email: filipe.spirlandeli1002@gmail.com</Text>
                    <Text>Telefone: +55 (16) 98200-7727</Text>
                    <Text>Linkedin: <Link target="_blank" href="https://www.linkedin.com/in/filipe-spirlandeli-junqueira-354b63264/">Filipe Spirlandeli Junqueira</Link></Text>
                    <Text>GitHub: <Link target="_blank" href="https://github.com/FilipeSJ1002">FilipeSJ1002</Link></Text>
                    <Text>Localização: Franca-SP</Text>
                </Box>
                <Box pt={'15px'}><Center><Footer /></Center></Box>
            </AbsoluteCenter>
        </Flex>

    )
}

export default Contact;