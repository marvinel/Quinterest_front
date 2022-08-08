import React from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import Fav from "../Fav.js";

function Card({image}) {

    return (
        <div className="Image" >
            
    
        
            <img src={image.image.secure_url} alt={image.title} />
            <div className="Details-image">
                <div className="Details-perfil">
                    <img src="https://noverbal.es/uploads/blog/rostro-de-un-criminal.jpg" alt="perfil"></img>
                </div>
                <p><Link to={"/perfil/"+image.user}>{image.title}</Link>😊</p>
                <Fav id={image._id}></Fav>
            </div>
        </div>
    );
}

export default Card;
