import { AbsoluteCenter, Box, Center, Flex, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";

function AboutUs() {

    return (
        <Flex>
            <AbsoluteCenter mt={'80px'} padding={'35px'} border={'2px'} boxShadow={'0 7px 8px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2)'}>
                <Box>
                    <Text fontSize={'3xl'}>Sobre nós:</Text>
                    <Text>
                        Este site foi desenvolvido como parte de um projeto de aprendizado e para demonstrar algumas das minhas habilidades.
                        A criação do projeto foi realizada de forma independente, com o auxílio de um profissional experiente para orientação.
                        <br />
                        Este é apenas o início da minha jornada. Continuarei estudando e me aprimorando para alcançar novos desafios e conquistas.
                    </Text>
                    <Text fontSize={'2xl'}>Como surgiu o Projeto VF?</Text>
                    <Text>
                        O Projeto VF nasceu como uma forma de aprendizado. A ideia era criar um site que combinasse diferentes mecânicas e,
                        ao mesmo tempo, fosse um desafio pessoal. Para isso, usei ReactJS no front-end, NestJS no back-end e
                        MongoDB como banco de dados — tecnologias que eu ainda não conhecia no início.
                        Ao longo do desenvolvimento, fui aprendendo e aplicando tudo na prática, o que tornou essa experiência ainda mais gratificante.
                    </Text>
                    <Text fontSize={'2xl'}>O Que é o Projeto VF?</Text>
                    <Text>
                        O Projeto VF foi criado com a ideia de ser um marketplace, onde os usuários podem se registrar, cadastrar produtos,
                        fazer reservas e anunciar seus próprios itens de forma simples e prática.
                    </Text>
                    <Text m={'10px'} fontStyle={'italic'}>Feito por Filipe S. Junqueira</Text>
                </Box>
                <Box pt={'15px'}><Center><Footer /></Center></Box>
            </AbsoluteCenter>
        </Flex>
    )
}

export default AboutUs;