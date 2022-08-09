import React, { useEffect, useContext, useState } from "react";
import axios from 'axios';
import Context from "../context/UserContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Perfil() {
  let navigate = useNavigate();
  const { jwt, favs } = useContext(Context)
  let { id } = useParams()
  const [info, setInfo] = useState({})

  useEffect(() => {
    let id2 = id || ''
    if(!jwt && !id){
      console.log("no puede estar aca va para el login")
      navigate(`/login`);
    }else{
  
    console.log(`http://localhost:3000/perfil?id=${id2}`)
    axios.get(`http://localhost:3000/perfil?id=${id2}`, {
      headers: {
        'Authorization': jwt
      }
    })
      .then(res => {
        console.log(res.data);
        setInfo(res.data)

      })
      .catch(err => console.error(err));
    }
  }, []);

  if (!info.name) {
    return <div>Cargando ...</div>
  } else {

    return (
      <div className="Perfil-wrapper">
        <div className="Cabecera"></div>
        <div className="User-section">
        <section className="Perfil-info">
          <div className="Perfil-img">
            <img src={info.profileimg?.secure_url}></img>
            
          </div>
          
          <div className="Perfil-detail">
            <h2>{info.name}</h2>
            <p>{info.user}</p>
          </div>
        </section>
        <section className="My-Img">
          <div><p>Subidas</p></div>
          <div className ="Perfil-gallery">
            {
              info.images.map(item => (
                <div className="Image-wrapper">
                  <img src={item.image.secure_url} alt="b">
                  </img> 
                  <span className="Description-Image">Hola hola que tal</span>
                  </div>

              ))
            }
          </div>

          <div><p>Favoritas</p></div>
          <div>

          </div>
        </section>
        </div>
      </div>
    );

  }
}

export default Perfil;