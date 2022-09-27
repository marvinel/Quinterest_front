import React, { useEffect, useState } from "react";

import Card from './minicomponent/Card.js';
import getallimagesService from "../services/getallimagesService.js";
import HashLoader from "react-spinners/HashLoader";

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
     
      {images.images ?
        <div className="Galeria">
         
          {
            images.images.map((image) => (
             <Card key={image._id} image={image}/>
            ))
          }
        </div> : <div style={{margin:'0 auto', textAlign:'center', width:'100%'}}><HashLoader color={'#EB0105'} loading={true}  size={150} /></div>
      }
    </div>
  );
}

export default Home;