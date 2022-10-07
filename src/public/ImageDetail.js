import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Fav from "./Fav.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ImageDetail({ userid, jwt }) {
  let navigate = useNavigate();
  const [image, setImage] = useState({});
  let { imageid } = useParams();
  useEffect(() => {
    console.log(`http://localhost:3000/image/${imageid}`);
    axios
      .get(`http://localhost:3000/image/${imageid}`)
      .then((res) => {
        setImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [imageid]);

  function descargar() {
    console.log("hola");
    var a = document.getElementById("descargar");
    console.log(a);
    var fileUrl = a.getAttribute("href");
    console.log(fileUrl);
    a.setAttribute(
      "href",
      "data:application/octet-stream," + encodeURIComponent(fileUrl)
    );
  }
  const eliminarimagen=()=>{
    console.log("Procedo a eliminar: "+ imageid)
    console.log(jwt)
    try {
      axios.post(`http://localhost:3000/image/${imageid}/delete`, {
        token: jwt
    })
        .then(res => {     
            console.log(res.data)            
        })
        .catch(err => console.error("error: "+err));
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <div className="ImageDetail">
      {Boolean(image.image) ? (
        <div className="ImgLeft">
          <img src={image.image.secure_url} alt={image.title}></img>
        </div>
      ) : (
        <div className="DetailRight">
          <HashLoader color={"#EB0105"} loading={true} size={150} />
        </div>
      )}
      {image.title ? (
        <div className="DetailRight">
          <div>
            <button onClick={() => navigate(-1)}>Cerrar</button>
          </div>

          <div className="Top-detalles">
            <p>{moment(image.created_at).format("MMMM Do YYYY")}</p>
            {userid === image.user ? (
              <div onClick={eliminarimagen}>Eliminar</div>
            ) : (
              <Fav id={image._id} lugar={"detalle"} />
            )}
          </div>
          <p className="Detalle-usuario">
            subido por  <span><Link to={"/perfil/" + image.user}>Persona</Link></span>
          </p>
          <div>
            <p className="Detalle-title">{image.title}</p>
            <p>{image.description}</p>
          </div>

          <div className="Detalle-descargar">
            <button onClick={descargar}>descargar</button>
            <a id="descargar" href={image.image.secure_url} download="cute.jpg">
              descargar
            </a>
          </div>
        </div>
      ) : (
        <div className="DetailRight">
          <HashLoader color={"#EB0105"} loading={true} size={150} />
        </div>
      )}
    </div>
  );
}

export default ImageDetail;
