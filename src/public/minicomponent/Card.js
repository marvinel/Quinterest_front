import React from "react";

import { Link } from 'react-router-dom';
import Fav from "../Fav.js";

function Card({ image }) {


    return (
        <div className="Image" >


            <div className="Image-wrapper">
                <Link to={`/image/${image._id}`}>
               
                <img src={image.image.secure_url} alt={image.title} />

                <div className="Description-hide">
                    <p>{image.description}</p>
                </div>
                </Link>
                <div className="Icon">
                    <Fav id={image._id} />
                </div>
            </div>
{
    !image.admin &&
    <div className="Details-image">
    <div className="Details-perfil">
        <img src="https://noverbal.es/uploads/blog/rostro-de-un-criminal.jpg" alt="perfil"></img>
    </div>
    <p><Link to={"/perfil/" + image.user}>{image.title}</Link></p>
    
</div>
}

        </div>
    );
}

export default Card;
