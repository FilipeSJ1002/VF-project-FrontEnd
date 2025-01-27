import { useNavigate } from "react-router-dom";
import ButtonConfig from "./ButtonConfig";

function Footer(){
    const navigate = useNavigate()
    const goToLogin = () => {
        navigate('/')
    }

    return(
        <div>
            <ButtonConfig text='Voltar para o inicio' onClick={goToLogin} />
        </div>
    )
}

export default Footer;