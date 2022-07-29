import React from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/material/IconButton';



function Card({image}) {

    return (
        <div className="Image" key={image._id}>
            <span className="Marca">
                <div>
                    <IconButton aria-label="Marcar">
                        <BookmarkBorderIcon />
                    </IconButton>
                </div>
                <div>
                    <p>{image.description}</p>
                </div>
            </span>
            <img src={image.image.secure_url} alt={image.title} />
            <div className="Details-image">
                <div className="Details-perfil">
                    <img src="https://noverbal.es/uploads/blog/rostro-de-un-criminal.jpg" alt="perfil"></img>
                </div>
                <p>{image.title} 😊</p>
            </div>
        </div>
    );
}

export default Card;
