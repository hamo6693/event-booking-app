import { useMutation } from "@apollo/client";
import React ,{useContext, useEffect, useState} from "react";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import Error from "../components/Error";
import Spinner from "../components/Spinner";

export default function LoginPage() {
    const value = useContext(AuthContext)
    const [alert,setAlert] = useState("")


    function Login() {
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const navigate = useNavigate()
        const [login,{loading,data}] = useMutation(LOGIN,{
            onError:(error) => setAlert(error.message)
        })
        useEffect(() => {
            if(!loading && data) {
                const token = data.login.token
                const userId = data.login.userId
                const username = data.login.username
                value.login(token,userId,username)
            }
        },[data,loading])
        if(loading) return <Spinner />;
        if(data) {
            console.log(data.login.token);
        }
    
    
    return(
        <form className="auth-form" onSubmit={(event) => {
            event.preventDefault()
            login({
                variables: {email: email.trim(), password: password.trim()}
            })
        }}>
                <Error error ={alert} />
                <div className="mb-3 mt-2">
                <label className="form-label" htmlFor="email">االبريد الاكتروني</label>
                <input value={email}
                onChange={({target}) => setEmail(target.value)}  
                className="form-control" id="email" type="email" required/>
            </div>
            <div className="mb-3 mt-2">
                <label className="form-label" htmlFor="password">كلمة المرور</label>
                <input value={password} 
                onChange={({target}) => setPassword(target.value)}
                className="form-control" id="password" type="password" required/>
            </div>
            <div className="forma-action">
                <button className="btn m-2" type="sumbit">ارسال</button>
                <button className="btn m-2" onClick={() => navigate("/singup")}>انتقال الى انشاء حساب</button>
            </div>
        </form>
        )
    };
        return(
            <Login />
        )
    
    
}
