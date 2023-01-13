import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";
import "../../styles/feed.css"

export interface Post {
    id: string;
    userId: string;
    title: string;
    description: string;
    username: string;
}

export const Main = () => {
    const postRef = collection(db, "posts");
    const [postLists, setPostsList] = useState<Post[] | null>(null);

    const getPosts = async ()=>{
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc)=> ({...doc.data(), id: doc.id})) as Post[]);
    }
    
    useEffect(()=>{
        getPosts();
    },[])

    return(
    <div className="centerhome">
        <div className="Homepage">
            {postLists?.map((post)=> 
            <Post post={post}/>
            )}
        </div>
    </div>
       
    );
}