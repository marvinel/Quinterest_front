import React, { useEffect, useState } from "react";

import Card from './minicomponent/Card.js';
import getallimagesService from "../services/getallimagesService.js";

function Home() {

  const [images, setImages] = useState({})
  
  useEffect(() => {
    getallimagesService()
    .then(res =>{
      setImages(res)
    })
  }, []);
  return (
    <div >
      <h2>INICIO</h2>
      {images.images ?
        <div className="Galeria">
          <svg data-testid="BookmarkBorderIcon"></svg>
          {
            images.images.map((image) => (
             <Card key={image._id} image={image}/>
            ))
          }
        </div> : <div>Cargando ...</div>
      }
    </div>
  );
}

export default Home;