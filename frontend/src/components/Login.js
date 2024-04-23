import React, { useState } from 'react';
import axios from "axios";
import {useGlobalContext} from "../Context/UserContext";
import {useNavigate} from "react-router-dom";


function Login() {
    const {setUser,updateUser }= useGlobalContext();
    const navigate = useNavigate()
    const [login,setLogin ]=useState({
        email:"",
        password:""
    })
    console.log("rensering",login)
    const handleChange = (e)=>{
            setLogin({
                ...login,
                [e.target.name]:e.target.value
            })
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const  formData = new FormData();
        formData.append("email",login.email);
        formData.append("password",login.password);
        axios.post("http://localhost:8080/api/user",formData)
            .then((res)=>{
                console.log("storing the email in the seession storage",res.data.email)
                updateUser(res.data.email);
                navigate(`/`);
            })
            .catch((e)=>{
                console.log("ERR",e)
            })
    }

    return (
        <div className=" login">
            <div className="row justify-content-center">
                <div className="col-md-6 ">
                    <div className="login-container mx-auto">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group1">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className=" " id="email" name="email" value={login.email}
                                       onChange={handleChange} placeholder="Enter email"/>
                            </div>
                            <div className="form-group1">
                                <label htmlFor="password">Password</label>
                                <input type="password" className=" " id="password" name="password"
                                       value={login.password} onChange={handleChange} placeholder="Password"/>
                            </div>
                            <button type="submit"  className="login_button">Login</button>
                        </form>
                        <p className="mt-3 text-end">No Account? <a href={`/register`}>SignUp</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
