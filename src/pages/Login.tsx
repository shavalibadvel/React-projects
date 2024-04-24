import {auth,provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Login=()=>{
    const navigate=useNavigate();
    const signInWithGoogle= async()=>{
        const ref=await signInWithPopup(auth,provider);
        navigate("/");
        console.log(ref);
    };
    return <div><p> Sign in With Google to continues</p>
    <button onClick={signInWithGoogle}> Sign in to Google</button>
    </div>
}
