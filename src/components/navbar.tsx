import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import '../styles/nav.css'
import {signOut} from 'firebase/auth'

export const Navbar = ()=> {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const singuserOut = async ()=> {
        await signOut(auth);
        navigate('login')
    };
    const showMenuMobile = ()=> {
        var x = document.getElementById("itensMenuMobile");
        if (x) {
            if (x.style.display === "block") {
                x.style.display = "none";
              } else {
                x.style.display = "block";
              }
        }
    };
    
    return(
        <>
            <div className='navbar'>
                    <Link to="/">Home</Link>
                    {!user ? (<Link to="/login">Login</Link>) : (<Link to="/createpost">Create Post</Link>)}
                <div className='infouseloged'>
                    <p>{user?.displayName}</p>
                    <img src={user?.photoURL || ""}/>
                    {user && <button onClick={singuserOut}>Sing Out</button>}
                </div>
            </div>
            <div className="navbarmobile">
                <div className="infouselogmob">
                    <img src={user?.photoURL || ""}/>  
                    <p>{user?.displayName}</p>                  
                </div>
                <div className='menuMobile'>
                    <button onClick={showMenuMobile}><img src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu"/></button>
                </div>

            </div>
            <div className="itensMenuMobile" id='itensMenuMobile'>
                <div className="menulinks">
                    <p><Link to="/">Home</Link></p>
                    <p>{user && <button onClick={singuserOut}>Sing Out</button>}</p>
                    <p>{!user ? (<Link to="/login">Login</Link>) : (<Link to="/createpost">Create Post</Link>)}</p>
                </div>
            </div>        
        </>


    );
}