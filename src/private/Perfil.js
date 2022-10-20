import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
//import 'antd/dist/antd.css';
import Context from "../context/UserContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import HashLoader from "react-spinners/HashLoader";
import ImageDetail from "../public/ImageDetail";
import Swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid grey",
  borderRadius: "15px",
  boxShadow: 24,
  background: "#ffffff90",
  p: 4,
};

function Perfil() {
  let navigate = useNavigate();
  const { jwt, favs, userid } = useContext(Context);
  let { id, imageid } = useParams();
  const [info, setInfo] = useState({});
  const [img, setImg] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [own, setOwn] = useState(false);
  useEffect(() => {
   
    if (!jwt ) {
      navigate(`/login`);
    } else {
      if(userid === id) { 
        setOwn(true);
      }
      axios
        .get(`http://localhost:3000/perfil?id=${id}`, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          
          setInfo(res.data);
          setImg(res.data.images);
        })
        .catch((err) => console.error(err));
    }
  }, [id, jwt, navigate]);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    var bodyFormData = new FormData();
    bodyFormData.append("image", selectedFile);
    bodyFormData.append("userId", info._id);

    if (open.type === "2") {
      bodyFormData.append("title", title);
      bodyFormData.append("description", description);
     
      try {
        axios.post(`http://localhost:3000/upload`, bodyFormData).then((res) => {
        
          setImg((img) => [...img, res.data.new_image]);
          setOpen({ type: "0", open: false });
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your image has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("error: " + error);
      }
    } else {
      axios
        .put(`http://localhost:3000/profileimg`, bodyFormData)
        .then((res) => {
          
          setOpen({ type: "0", open: false });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your image has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => console.error("error: " + err));
    }
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleTitle = (event) => setTitle(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);

  const [open, setOpen] = React.useState({ type: "0", open: false });
  const handleOpen = (type) => setOpen({ type: type, open: true });
  const handleClose = () => setOpen({ type: "0", open: false });
  if (!info.name) {
    return (
      <div>
        <HashLoader color={"#EB0105"} loading={true} size={150} />
      </div>
    );
  } else {
    return (
      <div className="Perfil-wrapper">
        <div className="Cabecera"></div>
        <div className="User-section">
          <section className="Perfil-info">
            <div className="Perfil-img">
              <img
                src={
                  info.profileimg
                    ? info.profileimg.secure_url
                    : require("../assets/perfil.png")
                }
                alt={info.name}
              ></img>
              {own &&
              <div className="Edit-Perfil-img">
                <button onClick={() => handleOpen("1")}>editar</button>
              </div>
              }
            </div>
            <div className="Perfil-detail">
              <h2>{info.name}</h2>
              <div className="Description-Section">
                <h3>Description</h3>
                <p><strong>Usuario: </strong> {info.user}</p>
                <p>Mas informacion proxima</p>
              </div>
              
            </div>
          </section>
          <section className="My-Img">
            {own && 
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => handleOpen("2")}
            >
              Sube una imagen
            </Button>
  }
            <Modal
              open={open.open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form className="formmodal" onSubmit={handleSubmit}>
                  {open.type !== "1" && (
                    <>
                      <label for="title" className="form__label">
                        Image Title
                      </label>
                      <input
                        type="text"
                        className="form__input"
                        id="title"
                        placeholder="Image Title"
                        required=""
                        value={title}
                        onChange={handleTitle}
                      />

                      <label for="description" className="form__label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        classzName="form__input"
                        id="description"
                        placeholder="Description"
                        required=""
                        value={description}
                        onChange={handleDescription}
                      />
                    </>
                  )}

                  <input type="file" onChange={handleFileSelect} />
                  <input type="submit" value="Upload File" />
                </form>
              </Box>
            </Modal>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Subidas" value="1" />
                <Tab label="Favoritas" value="2" />
              </TabList>
              <TabPanel value="1">
                <div className="Perfil-gallery">
                  {img.map((item) => (
                    <div key={item._id} className="Perfil-gallery-img">
                      <Link to={`image/${item._id}`}>
                        <img src={item.image.secure_url} alt={item.title}></img>

                        <p className="Perfil-gallery-img-description">
                          {item.description}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="Perfil-gallery">
                  {favs?.map((item) => (
                    <div key={item._id} className="Perfil-gallery-img">
                      <Link to={`image/${item.imgid}`}>
                        <img src={item.secure_url} alt="b"></img>
                        <span className="Perfil-gallery-img-description">
                          Hola hola que tal
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </TabContext>
          </section>
        </div>
        {imageid && (
          <div className="Wrapper-Detail">
            <ImageDetail userid={userid} jwt={jwt} />
          </div>
        )}
      </div>
    );
  }
}

export default Perfil;
