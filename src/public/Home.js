import React, { useEffect, useState } from "react";

import Card from "./minicomponent/Card.js";
import getallimagesService from "../services/getallimagesService.js";
import HashLoader from "react-spinners/HashLoader";
import ImageDetail from "./ImageDetail";
import { useParams } from "react-router-dom";
import useUser from "../useUser";
function Home() {
  const { userid } = useUser();
  const [images, setImages] = useState({});
  const [modal, setModal] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    console.log(userid)
    console.log("modal: "+ modal)
    
    getallimagesService().then((res) => {
      setImages(res);
    });
  }, [modal,userid]);
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
      { id &&
     <div className="Wrapper-Detail">
     <ImageDetail userid={userid} />
   </div>
      }
 
    </div>
  );
}

export default Home;
