import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
//import iconoreg from "../iconoreg.png";
import registerService from "../services/registerService";
import { useNavigate } from "react-router-dom";


import Swal from 'sweetalert2'

function Register() {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
   
    const onSubmit = data => {
        const name = data.name
        const user = data.user
        const email = data.email
        const password = data.password
        registerService({ name, user, email, password })
            .then(res => {
                console.log(res)
                if(res.ok === false){
                    Swal.fire({
                        title: 'Error!',
                        text: 'no pudo crear cuenta',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
                }else{
                    Swal.fire({
                        title: 'Success!',
                        text: 'iniciado correctamente ',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                      navigate(`/`);
                }
                

            })
            .catch(err => {
                console.log("no pudo registrar por: " + err)
                Swal.fire({
                    title: 'Error!',
                    text: "no pudo registrar por: " + err,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            })

    };
    return (
        <div className="Login-wrapper">
            <div className="container" id="container">
            <div className="overlay-container-signup">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to="/login"><button className="ghost" id="signIn">Sign In</button></Link>
                        </div>
                    </div>
                </div>
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <h1>Create Account</h1>
                  {  /*    <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>*/}
                        <span>or use your email for registration</span>
                       
                        <input type="text" {...register('name', {
                                required: true,
                                minLength: 2,
                            })} placeholder="Name" />
                            {errors.name?.type === 'required' && <p>El campo es requerido</p>}
                            <input className="Input" type="text" id="user" {...register('user')} placeholder="User" />
                            <input className="Input" type="text"  {...register('email', {
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                            })} placeholder="Email" />
                            {errors.email?.type === 'pattern' && <p>El campo es requerido</p>}
                            <input className="Input" type="password"  {...register('password')} placeholder="Password" />
                        <button  type="submit" value="Login" >Sign Up</button>
                    </form>

                </div>

            </div>
 
        </div>
    );
}

export default Register;