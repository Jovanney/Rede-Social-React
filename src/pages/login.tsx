import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import "../styles/login.css"

export const Login = ()=> {
    
    const navigate = useNavigate();

    const signInWithGoogle = async ()=> {
        const result = await signInWithPopup(auth, provider);
        navigate('/')
    };
    
    return(
        <div className="centerlog">
            <div className="logcontainer">
                <p>Sign In With Google To Continue</p>
                <button onClick={signInWithGoogle}><img src="https://bandodequadrados.com/img/imagem_noticia/f9ec22c82ebf65ca7bb36aeb460a8f59.jpg" alt="" /></button>
            </div>
        </div>
    );
}