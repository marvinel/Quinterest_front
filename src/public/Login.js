
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import useUser from "../useUser";
import loginService from "../services/loginService";
import { useNavigate } from "react-router-dom";

import Alert from '@mui/material/Alert';
function Login() {
    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLogged } = useUser();
    const [alert, setAlert] = useState("0")

    useEffect(() => {
        if (isLogged) console.log("No deberia poder entrar al login")
    }, [isLogged])

    const onSubmit = data => {

        const email = data.email
        const password = data.password
        var ir = alert
        loginService({ email, password })
            .then(res => {
                console.log(res)
                setAlert("1")
                ir = "1";
                login(res);

            })
            .catch(err => {
                console.log("no pudo iniciar sesion por: " + err)
                setAlert("2")
            })

        const timer = setTimeout(() => {
            setAlert("0")
            if(ir === "1"){
                navigate(`/`);
            }
        }, 2000);
        
        return () => clearTimeout(timer);

    };



    return (
        <div className="Login-wrapper">

            <div className="container" id="container">


                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign in</h1>
                        {/*   <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
    </div>*/}
                        <span>or use your account</span>
                        <input className="Input" type="email"  {...register('email', {
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                        })} placeholder="Email" />
                        {errors.email?.type === 'pattern' && <p>El campo es requerido</p>}

                        <input className="Input" type="password"  {...register('password')} placeholder="Password" />

                        {// <a href="#">Forgot your password?</a>
                        }
                        <button type="submit" value="Login">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">

                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to="/register"> <button className="ghost" id="signUp">Sign Up</button></Link>
                        </div>
                    </div>
                </div>

            </div>

            {
                alert === "1" &&
                <Alert variant="filled" severity="success">
                    This is a success alert — check it out!
                </Alert>
            }
            {
                alert === "2" &&
                <Alert variant="filled" severity="error">
                    This is an error alert — check it out!
                </Alert>
            }

        </div>

    );
}

export default Login;
