import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Fav from "./Fav.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Swal from 'sweetalert2'
import { saveAs } from 'file-saver';
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

  const DownloadImg = (URL) =>{
    
    saveAs(URL,image.title+".png");
  }
  return (
    <div className="ImageDetail">
                <div>
            <button className="Cerrar" onClick={() => navigate(-1)}>X</button>
          </div>
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
            <p>{moment(image.created_at).format("MMMM Do YYYY")}</p>
            {userid === image.user ? (
              <button className="Save" onClick={eliminarimagen}>Delete</button>
            ) : (
              <Fav id={image._id} lugar={"detalle"} />
            )}
          </div>
          <p className="Detalle-usuario">
          Uploaded by  {!image.admin && <span><Link to={"/perfil/" + image.user}>...</Link></span>}
          </p>
          <div>
            <p className="Detalle-title">{image.title}</p>
            <p>{image.description}</p>
          </div>

          <div className="Detalle-descargar">
            <button className="DownloadImg" onClick={()=>DownloadImg(image.image.secure_url)} >Download</button>
              
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
