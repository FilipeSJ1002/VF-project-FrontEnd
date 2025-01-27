import { useNavigate } from "react-router-dom";
import ButtonConfig from "./ButtonConfig";

function Footer(){
    const navigate = useNavigate()
    const goToLogin = () => {
        navigate('/product-list')
    }

    return(
        <div>
            <ButtonConfig text='Voltar' onClick={goToLogin} />
        </div>
    )
}

export default Footer;