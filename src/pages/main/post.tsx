import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as IPost} from "./main"
import "../../styles/post.css"



interface Props {
    post: IPost
}
interface Like{
    userId: string;
    likeid: string,
}

export const Post = (props: Props)=> {
    const { post } = props;
    const [user] = useAuthState(auth);

    const likesRef = collection(db, "Likes");
    const likeDoc = query(likesRef, where("postId", "==", post.id));
    const [like, setlike] = useState<Like[] | null>(null);
    const hasUserLike = like?.find((like) => like.userId === user?.uid);
    
    const getLikes = async ()=>{
        const data = await getDocs(likeDoc);
        setlike(data.docs.map((doc)=> ({userId: doc.data().userId, likeid: doc.id})));
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id});
            if (user) {
                setlike((prev)=> prev ? [...prev, {userId: user?.uid, likeid: newDoc.id}] : [{userId: user?.uid, likeid: newDoc.id}]);
            } 
        }catch (error) {
            console.log(error)
        }
    };

    const removelike = async () => {
        try {
            const liketodelete = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const liketodelitedata = await getDocs(liketodelete);
            const deletelike = doc(db, "Likes", liketodelitedata.docs[0].id);
            await deleteDoc(deletelike);
            if (user) {
                setlike((prev)=> prev && prev.filter((like) => like.likeid !== liketodelitedata.docs[0].id));
            } 
        }catch (error) {
            console.log(error)
        }
    };
    

    useEffect(()=>{
        getLikes();

    },[]);


    
    return(
        <div className="post">

            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footerpost">
                <p>@{post.username}</p>
                <button onClick={hasUserLike ? removelike : addLike}>
                    {hasUserLike ? <>&#128078;</> : <>&#128077;</> } 
                </button>
                {like && <p>Likes: {like?.length}</p>}
            </div>
            
        </div>
    )
};