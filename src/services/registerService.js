
import axios from 'axios';

async function  registerService({name,user, email, password }) {
       //const ENDPOINT = "http://localhost:3000/"
       const ENDPOINT = "https://quinteresback-production.up.railway.app/"
   return await axios.post(`${ENDPOINT}add_user`, {
    name: name,
    user: user,
    email: email,
    password: password
})
    .then(res => {
        console.log(res.data);
        return res.data
    })
    .catch(err => console.error(err));
}

export default registerService