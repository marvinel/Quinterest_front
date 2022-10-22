import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Fav from "./Fav.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Swal from 'sweetalert2'
function ImageDetail({ userid, jwt }) {
  let navigate = useNavigate();
  const [image, setImage] = useState({});
  let { imageid } = useParams();
  useEffect(() => {
   
    axios
      //.get(`http://localhost:3000/image/${imageid}`)
      .get(`https://quinteresback-production.up.railway.app/image/${imageid}`)
      .then((res) => {
        setImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [imageid]);

  function descargar() {
   
    var a = document.getElementById("descargar");
    
    var fileUrl = a.getAttribute("href");
    
    a.setAttribute(
      "href",
      "data:application/octet-stream," + encodeURIComponent(fileUrl)
    );
  }
  const eliminarimagen=()=>{

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          
          //axios.post(`http://localhost:3000/image/${imageid}/delete`, {
          axios.post(`https://quinteresback-production.up.railway.app/image/${imageid}/delete`, {  
            token: jwt
        })
            .then(res => {     
              
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )    
                navigate(-1)        
            })
            
        } catch (error) {
          
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }

      }
    })


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
            <button className="Cerrar" onClick={() => navigate(-1)}>X</button>
          </div>

          <div className="Top-detalles">
            <p>{moment(image.created_at).format("MMMM Do YYYY")}</p>
            {userid === image.user ? (
              <button className="Save" onClick={eliminarimagen}>Delete</button>
            ) : (
              <Fav id={image._id} lugar={"detalle"} />
            )}
          </div>
          <p className="Detalle-usuario">
          Uploaded by  <span><Link to={"/perfil/" + image.user}>...</Link></span>
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
