import { getDocs,collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
export interface PostInterface{
    id:string;
    userId:string;
    username:string;
    description:string,
    title:string;
}
export const Main=()=>{
    const [postsLists,setPostsList]=useState<PostInterface[] |null>(null);
    const refDataBase=collection(db,"posts");
    const getPosts=async ()=>{
        
            const data = await getDocs(refDataBase);
            setPostsList(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostInterface[]
        );     
    }
    useEffect(()=>{
        getPosts();
    },[]);
    return (
    <div>{postsLists?.map((post)=>(
        <Post post={post} />))}</div>
    )
}