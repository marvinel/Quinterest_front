import React, { useEffect, useState } from "react";

import Card from "./minicomponent/Card.js";
import getallimagesService from "../services/getallimagesService.js";
import HashLoader from "react-spinners/HashLoader";
import ImageDetail from "./ImageDetail";
function Home() {
  const [images, setImages] = useState({});
  const [modal, setModal] = useState(false);


  useEffect(() => {
    setModal(false)
    getallimagesService().then((res) => {
      setImages(res);
    });
  }, []);
  return (
    <div>
      {images.images ? (
        <div className="Galeria">
          {images.images.map((image) => (
            <Card key={image._id} image={image} showmodal={()=> setModal(true)} />
          ))}
        </div>
      ) : (
        <div style={{ margin: "0 auto", textAlign: "center", width: "100%" }}>
          <HashLoader color={"#EB0105"} loading={true} size={150} />
        </div>
      )}
      { modal &&
     <div className="Wrapper-Detail">
     <ImageDetail />
   </div>
      }
 
    </div>
  );
}

export default Home;
