
import axios from 'axios';

 async function  loginService({ email, password }) {
        //const ENDPOINT = "http://localhost:3000/"
        const ENDPOINT = "https://quinteresback-production.up.railway.app/"
    return await axios.post(`${ENDPOINT}login`, {
        email: email,
        password: password
    })
        .then(res => {
            const user = {
                token: res.data.token,
                user: res.data.usuario.user,
                id: res.data.usuario._id
            }
            console.log(user)
            return user
        })
        .catch(err => {
            window.sessionStorage.removeItem('jwt');
            console.error(err)
        });
}

export default loginService