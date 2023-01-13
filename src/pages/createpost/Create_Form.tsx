import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import '../../styles/formpost.css'

interface CreateFormData {
    title: string
    description: string
}

export const CreateForm = ()=> {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a Title!"),
        description: yup.string().required("You must add a Description!"),

    });

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, "posts");
    

    const onCreatePost = async (data: CreateFormData)=> {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userid: user?.uid,
        })
        navigate("/");
    };
    
    return(
        <div className='center'>
            <div className='formCreatePost'>
                <form onSubmit={handleSubmit(onCreatePost)}>
                    <input type="text" placeholder='Title...' {...register("title")}/>
                    <p> {errors.title?.message}</p>
                    <textarea placeholder='Description...' {...register("description")}/>
                    <p> {errors.description?.message}</p>
                    <input type="submit"/>
                </form>
            </div>
        </div>


     );
} 