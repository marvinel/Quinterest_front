
import React from "react";
import { useForm } from "react-hook-form";

function Login() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);


  return (
    <div >
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name</label>
                <input type="text" {...register('name', {
                    required: true,
                    minLength: 2,
                })} placeholder="Name" />
                {errors.name?.type === 'required' && <p>El campo es requerido</p>}
            </div>
            <div>
                <label>User</label>
                <input type="text"  {...register('user')}  placeholder="User" />
            </div>
            <div>
                <label>Email</label>
                <input type="text"  {...register('email', {
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                })} placeholder="Email" />
                {errors.email?.type === 'pattern' && <p>El campo es requerido</p>}
            </div>
            <div>
                <label>Password</label>
                <input type="password"  {...register('password')} placeholder="Password" />
            </div>

            <input type="submit" value="Login" />
        </form>
    </div>
  );
}

export default Login;
