import { useMutation } from "@apollo/client";
import React ,{useState} from "react";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    

    function Login() {
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const navigate = useNavigate()
        const [login,{loading,error,data}] = useMutation(LOGIN,{
            onCompleted:console.log("تم التسجيل بنجاح")
        })
        if(loading) return <p>Loading...</p>;
        if(error) return error.message
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
