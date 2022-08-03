
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from 'axios';

import iconoreg from "../iconoreg.png";  
import useUser from "../useUser";

function Login() {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {login, isLogged} = useUser();

    useEffect(() => {
        if (isLogged) console.log("No deberia poder entrar al login")
     },[isLogged])  
     
    const onSubmit = data => {
        console.log(data.name + "-"+data.user+"-"+data.email+"-"+data.password)
        
        axios.post(`http://localhost:3000/add_user`,{
            name: data.name,
            user: data.user,
            email: data.email,
            password:data.password
        })
        .then(res => {
          console.log(res.data);
            console.log(document.getElementById('user'));
            login();
           // document.getElementById('user').value="";
        })
        .catch(err => console.error(err));

    };



  return (
    <div className="Login-wrapper">


    <div className="Login">
       <div className="Left-login">
        
        <form onSubmit={handleSubmit(onSubmit)} className="Login-Form">
        <h2>Welcome</h2>
            <div className="Form-items">
                
                <input className="Input"  type="text" {...register('name', {
                    required: true,
                    minLength: 2,
                })} placeholder="Name" />
                {errors.name?.type === 'required' && <p>El campo es requerido</p>}
            </div>
            <div className="Form-items">
               
                <input className="Input" type="text" id="user" {...register('user')}  placeholder="User" />
            </div>
            <div className="Form-items">
                
                <input className="Input" type="text"  {...register('email', {
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                })} placeholder="Email" />
                {errors.email?.type === 'pattern' && <p>El campo es requerido</p>}
            </div>
            <div className="Form-items">
               
                <input className="Input" type="password"  {...register('password')} placeholder="Password" />
            </div>

            <input className="form-button" type="submit" value="Login" />
        </form>
        </div> 
        <div className="Right-login">
                <div className="Login-img">
                    <h3>IMAGEN</h3>
                    <img src={iconoreg} alt="icono" />
                </div>
        </div>
        </div>
    </div>
  );
}

export default Login;
