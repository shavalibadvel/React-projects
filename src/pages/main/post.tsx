
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { PostInterface } from "./Main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props{
    post:PostInterface;
}
interface Like{
    likeId:string;
    userId:string;
}
export function Post(props:Props){
    const [likes,setLike]=useState<Like[] |null>(null);
    const {post}=props;
    const [user]=useAuthState(auth)
    const likesRef=collection(db,"likes")

    const likesDoc=query(likesRef,where("postId","==",post.id));

    const getLikes=async()=>{
        const data=await getDocs(likesDoc);
        setLike(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
    }
    const addLike=async ()=>{
        try{
        const newDoc=await addDoc(likesRef,{
            userId:user?.uid,
            postId:post.id
        })
        if(user){
        setLike((prev)=>prev ? [...prev,{userId:user?.uid,likeId:newDoc.id}] : [{userId:user?.uid,likeId:newDoc.id}])
        }
    }
    catch(e){
        console.log(e);
    }}
    const removeLike=async ()=>{
        try{
            const deleteLike=query(likesRef,
                where("postId","==",post.id),
                where("userId","==",user?.uid)
            );
            const deleteLikeData=await getDocs(deleteLike);
            const likeToDelete=doc(db,"likes",deleteLikeData.docs[0].id);
        await deleteDoc(likeToDelete);
        if(user){
            setLike((prev)=>prev&& prev?.filter((like)=>like.likeId !==deleteLikeData.docs[0].id))
        }
    }
    catch(e){
        console.log(e);
    }
    }
    
    useEffect(()=>{
        getLikes();
    },[])
  const hasUserLiked=likes?.find((like)=>like.userId===user?.uid)  
return (
    <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>

        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked?removeLike:addLike}>{hasUserLiked ?<> &#128078; </>:<>&#128077;</>}</button>
            {likes && <p>Likes:{likes.length}</p>}
        </div>
    </div>
)
}