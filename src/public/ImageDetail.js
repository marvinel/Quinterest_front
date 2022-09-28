import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Fav from "./Fav.js";
function ImageDetail(props) {
  const [image, setImage] = useState({});
  let { id } = useParams();
  useEffect(() => {
    console.log(`http://localhost:3000/image/${id}`);
    axios
      .get(`http://localhost:3000/image/${id}`)
      .then((res) => {
        console.log(res.data.image);
        setImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [id]);

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
          <div className="Top-detalles">
            <p>{image.created_at}</p>

            <Fav id={image._id} lugar={"detalle"} />
          </div>
          <p className="Detalle-usuario">
            subido por <span>Marvin Santiago</span>
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
