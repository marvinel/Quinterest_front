import React from "react";
import { useForm } from "react-hook-form";

import axios from 'axios';

 

function Register() {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data.email+"-"+data.password)
        
        axios.post(`http://localhost:3000/login`,{
            email: data.email,
            password:data.password
        })
        .then(res => {
          console.log(res.data);
            
           // document.getElementById('user').value="";
        })
        .catch(err => console.error(err));

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

export default Register;
