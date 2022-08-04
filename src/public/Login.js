
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from 'axios';
import {Link} from 'react-router-dom';
import useUser from "../useUser";

function Login() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const {login, isLogged} = useUser();

    useEffect(() => {
        if (isLogged) console.log("No deberia poder entrar al login")
     },[isLogged])  
     
     const onSubmit = data => {
        console.log(data.email+"-"+data.password)
        
        axios.post(`http://localhost:3000/login`,{
            email: data.email,
            password:data.password
        })
        .then(res => {
          console.log(res.data);
          console.log(res.data)
          const user = {
            token: res.data.token,
            user: res.data.usuario.user,
            id: res.data.usuario._id
        }
        

       
            login(user);
           // document.getElementById('user').value="";
        })
        .catch(err =>{ 
            window.sessionStorage.removeItem('jwt');
            console.error(err)});

    };



  return (
<div className="Login-wrapper">


<div className="Login">
   <div className="Left-login">
    
    <form onSubmit={handleSubmit(onSubmit)} className="Login-Form">
    <h2>Login</h2>


        <div className="Form-items">
            
            <input className="Input" type="text"  {...register('email', {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
            })} placeholder="Email" />
            {errors.email?.type === 'pattern' && <p>El campo es requerido</p>}
        </div>
        <div className="Form-items">
           
            <input className="Input" type="password"  {...register('password')} placeholder="Password" />
        </div>
        <p>No tienes cuenta? <Link to="/register">Registrate</Link></p>
        <input className="form-button" type="submit" value="Login" />
    </form>

    </div> 
    <div className="Right-login">
            <div className="Login-img">
                <h3>IMAGEN</h3>
             
            </div>
    </div>
    </div>
</div>
  );
}

export default Login;
