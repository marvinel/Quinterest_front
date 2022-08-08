
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import useUser from "../useUser";
import loginService from "../services/loginService";
function Login() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLogged } = useUser();

    useEffect(() => {
        if (isLogged) console.log("No deberia poder entrar al login")
    }, [isLogged])

    const onSubmit = data => {

        const email = data.email
        const password = data.password
        loginService({ email, password })
            .then(res => {
                console.log(res)
                login(res);
            })


    };



    return (
        <div className="Login-wrapper">

            <div class="container" id="container">

                <div class="form-container sign-in-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign in</h1>
                        <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input className="Input" type="email"  {...register('email', {
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                        })} placeholder="Email" />
                        {errors.email?.type === 'pattern' && <p>El campo es requerido</p>}

                        <input className="Input" type="password"  {...register('password')} placeholder="Password" />
                        
                        <a href="#">Forgot your password?</a>
                        <button type="submit" value="Login">Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">

                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to="/register"> <button class="ghost" id="signUp">Registrate</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;
