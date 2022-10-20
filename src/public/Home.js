import React, { useEffect, useState } from "react";

import Card from "./minicomponent/Card.js";
import getallimagesService from "../services/getallimagesService.js";
import HashLoader from "react-spinners/HashLoader";
import ImageDetail from "./ImageDetail";
import {  useParams } from "react-router-dom";
import useUser from "../useUser";
function Home() {
  const { userid, jwt } = useUser();
  const [images, setImages] = useState({});
 

  let { imageid } = useParams();
  useEffect(() => {

    
    getallimagesService().then((res) => {
      setImages(res);
      
    });
  }, [userid,jwt]);

  return (
    <div>
      {images.images ? (
        <div className="Galeria">
          {images.images.map((image) => (
            <Card key={image._id} image={image} jwt={jwt}  />
          ))}
        </div>
      ) : (
        <div style={{ margin: "0 auto", textAlign: "center", width: "100%" }}>
          <HashLoader color={"#EB0105"} loading={true} size={150} />
        </div>
      )}
      { imageid &&
     <div className="Wrapper-Detail">
     <ImageDetail userid={userid} jwt={jwt} />
   </div>
      }
 
    </div>
  );
}

export default Home;
