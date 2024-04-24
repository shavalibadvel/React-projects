
import  * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
interface createFormData{
    title:string;
    description:string;
}
export function Form(){
    const [user] =useAuthState(auth);
    const schema=yup.object().shape({
        title:yup.string().required("you must add a title"),
        description:yup.string().required("you must add description"),

    });
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors},}=useForm<createFormData>({
        resolver:yupResolver(schema),
    });
    const postsRef=collection(db,"posts")
    const onCreatePost=async (data:createFormData)=>{
        await addDoc(postsRef,{
            ...data,
            username:user?.displayName,
            userId:user?.uid,
        })
        navigate("/");
    }
    return(
        <form onSubmit={handleSubmit(onCreatePost)}>
            <div>
            <input type="text" placeholder="Title..." {...register("title")}/><span>  </span>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea  placeholder="Description..." {...register("description")}/>
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <input type="submit" className="submitForm"/>
            </div>
        </form>
    )
}

