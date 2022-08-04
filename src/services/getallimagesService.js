import axios from 'axios';

 async function  getallimagesService() {
    const ENDPOINT = "http://localhost:3000/"
    return await axios.get(ENDPOINT)
    .then(res => {
      console.log(res.data);
      return res.data
    })
    .catch(err => console.error(err));
}

export default getallimagesService