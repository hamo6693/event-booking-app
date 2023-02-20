import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { CREATE_USER } from "../queries";
import AuthContext from "../context/auth-context";
import Error from "../components/Error";

export default function SingUpPage() {
const [alert,setAlert] = useState("")

  const value = useContext(AuthContext)

  function SingUp() {
    const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [singup, { loading, data }] = useMutation(CREATE_USER, {
      onError:(error) => setAlert(error.message),
      onCompleted:() => setAlert("تم  انشاء التسجيل بنجاح")
    })
    useEffect(() => {
      if(!loading && data) {
          const token = data.createUser.token
          const userId = data.createUser.userId
          const username = data.createUser.username
          value.login(token,userId,username)
      }
  },[data,loading])
    if (loading) return <p>Loading...</p>;
    
    
    return (
      <form
        className="auth-form"
        onSubmit={() => {
          if(username.trim().length <3 || password.trim().length < 6) {
            console.log("يجب ملئ الحقول بالشكل المناسب")
            return
          }
          singup({
            variables: { username:username.trim() ,email: email.trim(), password: password.trim() },
          });
        }}
      >
        <Error error={alert} />
        <div className="mb-3 mt-2">
          <label className="form-label" htmlFor="username">
            اسم المستخدم
          </label>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className="form-control"
            id="username"
            type="text"
            required
          />
        </div>
        <div className="mb-3 mt-2">
          <label className="form-label" htmlFor="email">
            االبريد الاكتروني
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className="form-control"
            id="email"
            type="email"
            required
          />
        </div>
        <div className="mb-3 mt-2">
                <label className="form-label" htmlFor="password">كلمة المرور</label>
                <input value={password} 
                onChange={({target}) => setPassword(target.value)}
                className="form-control" id="password" type="password" required/>
            </div>
        <div className="forma-action">
          <button className="btn m-2" type="sumbit">
            ارسال
          </button>
        </div>
      </form>
    );
  }
  return <SingUp />;
}
