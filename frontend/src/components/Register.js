import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Register(props) {

    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        username:"",
        email:"",
        password:"",
        image:null
    });
    console.log(registerForm)
    //update the register form data
    const handleChange = (e)=>{
        if(e.target.name === "profilePicture"){
            setRegisterForm({
                ...registerForm,
                image: e.target.files[0]
            })
        }else {
            setRegisterForm({
                ...registerForm,
                [e.target.name]:e.target.value
            })
        }
    }
    //handle the submit form
    const handleSubmit = (e)=>{

        e.preventDefault();

        const  formData = new FormData();
        formData.append("username",registerForm.username);
        formData.append("email",registerForm.email);
        formData.append("password",registerForm.password);
        formData.append("image",registerForm.image);


       axios.post("http://localhost:8080/api/users",formData, {
           headers: {
               "Content-Type": "multipart/form-data",
           },
       })
           .then((res)=>{
               console.log("data sent :",res)
               if(res.data==="ok"){
                   navigate(`/login`);
               }
               else {
                   navigate(`/register`);
               }


           })
           .catch((err)=>{
               console.log("ERROR:",err)
           })
    }
    return (
        <div className=" register">
            <div className="row justify-content-center">
                <div className="col-md-6 ">
                    <div className="register-container mx-auto">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group1">
                                <label htmlFor="username">User Name</label>
                                <input type="text" className=" " id="username" name="username" value={registerForm.username} onChange={handleChange}
                                       placeholder="Enter email"/>
                            </div>
                            <div className="form-group1">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className=" " id="email" name="email" value={registerForm.email} onChange={handleChange}placeholder="Enter email"/>
                            </div>
                            <div className="form-group1">
                                <label htmlFor="password">Password</label>
                                <input type="password" className=" " id="password" name="password"value={registerForm.password} onChange={handleChange} placeholder="Password"/>
                            </div>
                            <div className="form-group1">
                                <label  htmlFor="profilePicture">Profile Image:</label>
                                <input  type="file" id="profilePicture" name="profilePicture" onChange={handleChange} accept="image/*"/>
                            </div>
                                <button type="submit" className="login_button">Register</button>
                        </form>
                        <p className="mt-3 text-end">Have an Account? <a href={`/login`}>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;