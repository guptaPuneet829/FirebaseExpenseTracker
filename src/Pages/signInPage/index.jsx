import { authentication,provider } from "../../Config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate,Navigate } from "react-router-dom"
import { useGetUserInfo } from "../../Hooks/useGetUserInfo"
import "./style.css"

export const Authentication = () =>{

    const navigate=useNavigate();
    const { isAuth } = useGetUserInfo();

    const signInWithGogle = async() =>{
        const res=await signInWithPopup(authentication,provider);
        const authenticateUserInfo={
            userId:res.user.uid,
            userName:res.user.displayName,
            userProfilePhotoURL:res.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("authentication",JSON.stringify(authenticateUserInfo));
        navigate("/mainPage");
    };
    if(isAuth){
        return <Navigate to="/mainPage" />
    }
    return(
        <div className="loginPage">
            <img src="https://cdn-icons-png.flaticon.com/512/10758/10758868.png" alt="icon image"/>
            <p>sign in with google to continue</p>
            <button className="loginBtnWithGoogle" onClick={signInWithGogle}>sign in with google</button>
        </div>
    );
};
