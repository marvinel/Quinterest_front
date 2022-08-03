import React, { useEffect } from "react";
import axios from 'axios';


function Perfil() {
  
    useEffect(() => {
        
        const userId = JSON.parse(localStorage.getItem('userConexion'));
        console.log(userId)
        if(userId){
        axios.get(`http://localhost:3000/perfil?id=${userId.id}`)
          .then(res => {
            console.log(res.data);
           
    
          })
          .catch(err => console.error(err));
        }else{
            console.log("inicie sesion")
        }
      }, []);
      

    return (
        <div className="Header">
            PERFIL
        </div>
    );


}

export default Perfil;