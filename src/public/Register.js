import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import iconoreg from "../iconoreg.png";
import registerService from "../services/registerService";

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const name = data.name
        const user = data.user
        const email = data.email
        const password = data.password
        registerService({ name, user, email, password })
            .then(res => {
                console.log(res)
            })

    };

    return (
        <div className="Login-wrapper">
            <div className="Login">
                <div className="Left-login">
                    <form onSubmit={handleSubmit(onSubmit)} className="Login-Form">
                        <h2>Welcome</h2>
                        <Link to="/login">Volver</Link>
                        <div className="Form-items">
                            <input className="Input" type="text" {...register('name', {
                                required: true,
                                minLength: 2,
                            })} placeholder="Name" />
                            {errors.name?.type === 'required' && <p>El campo es requerido</p>}
                        </div>
                        <div className="Form-items">
                            <input className="Input" type="text" id="user" {...register('user')} placeholder="User" />
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

export default Register;