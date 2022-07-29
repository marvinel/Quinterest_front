import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from './minicomponent/Card.js';
function Home() {

  const [images, setImages] = useState({})

  useEffect(() => {

    axios.get(`http://localhost:3000`)
      .then(res => {
        console.log(res.data);
        setImages(res.data);

      })
      .catch(err => console.error(err));
  }, []);


  return (
    <div >
      <h2>INICIO</h2>

      {images.images ?
        <div className="Galeria">

          <svg data-testid="BookmarkBorderIcon"></svg>
          {
            images.images.map((image) => (

             <Card image={image}/>

            ))
          }
        </div> : <div>Cargando ...</div>
      }
    </div>
  );


}

export default Home;