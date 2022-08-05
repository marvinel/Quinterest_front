import React, { useEffect, useContext, useState } from "react";
import axios from 'axios';
import Context from "../context/UserContext";
import {useParams} from "react-router-dom";
function Perfil() {
  const {  jwt, favs } = useContext(Context)
    let { id } = useParams()
    const [info, setInfo] = useState({})
    
    useEffect(() => {
        let id2 = id || ''
        console.log(favs)
        console.log(`http://localhost:3000/perfil?id=${id2}`)
        axios.get(`http://localhost:3000/perfil?id=${id2}`,{
          headers: {
            'Authorization': jwt
          }
        })
          .then(res => {
            console.log(res.data);
           setInfo(res.data)
    
          })
          .catch(err => console.error(err));

      }, []);
      

    return (
        <div className="Perfil-wrapper">
            <section className="Perfil-info">
              <div className="Perfil-img">
                <img></img>
                <p>{info.user}</p>
              </div>
              <div className="Perfil-detail">
                <h2>{info.name}</h2>
              </div>
            </section>
            <section className="My-Img">
                <div><p>Subidas</p></div>
                <div>
                {
                    info.images.map(item =>(
                      <div className="Image-wrapper">
                        <img src={item.image.secure_url} alt="b">
                      </img> </div>
                      
                    ))
                  }
                </div>

                <div><p>Favoritas</p></div>
                <div>

                </div>
            </section>
        </div>
    );


}

export default Perfil;