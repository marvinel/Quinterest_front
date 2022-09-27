import React, { useEffect, useContext, useState } from "react";
import axios from 'axios';
//import 'antd/dist/antd.css';
import Context from "../context/UserContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import HashLoader from "react-spinners/HashLoader";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid grey',
  borderRadius: '15px',
  boxShadow: 24,
  background: '#ffffff90',
  p: 4,
};

function Perfil() {
  let navigate = useNavigate();
  const { jwt, favs } = useContext(Context)
  let { id } = useParams()
  const [info, setInfo] = useState({})
  const [img, setImg] = useState({})
  const [selectedFile, setSelectedFile] = React.useState(null);
  useEffect(() => {

    let id2 = id || ''
    if (!jwt && !id) {
     
      navigate(`/login`);
    } else {

      console.log(`http://localhost:3000/perfil?id=${id2}`)
      axios.get(`http://localhost:3000/perfil?id=${id2}`, {
        headers: {
          'Authorization': jwt
        }
      })
        .then(res => {
          console.log(res.data);
          setInfo(res.data)
          setImg(res.data.images)

        })
        .catch(err => console.error(err));
    }
  }, [id, jwt, navigate]);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedFile);
    bodyFormData.append('userId', '62ffa9e2c8c63c8e90e3d54f');
    if(open.type === "2"){
      bodyFormData.append('title', 'image 5');
      bodyFormData.append('description', ' description 5');
      axios.post(`http://localhost:3000/upload`, bodyFormData)
        .then(res => {
          console.log(img)
          console.log(res.data.new_image)
          setImg(img => [...img, res.data.new_image]);
  
        })
        .catch(err => console.error("error: " + err));
    }else{
      axios.put(`http://localhost:3000/profileimg`, bodyFormData)
      .then(res => {
      
        console.log(res)
       

      })
      .catch(err => console.error("error: " + err));
    }

  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


  const [open, setOpen] = React.useState({type:"0", open:false});
  const handleOpen = (type) => setOpen({type:type, open:true});
  const handleClose = () => setOpen({type:"0", open:false});
  if (!info.name) {
    return <div><HashLoader color={'#EB0105'} loading={true}  size={150} /></div>
  } else {

    return (
      <div className="Perfil-wrapper">
        <div className="Cabecera"></div>
        <div className="User-section">
          <section className="Perfil-info">
            <div className="Perfil-img">
              <img src={info.profileimg?.secure_url} alt={info.name}></img>
              <div className="Edit-Perfil-img"><Button  onClick={()=> handleOpen("1")}>editar</Button> </div>
            </div>
            <div className="Perfil-detail">
              <h2>{info.name}</h2>
              <p>{info.user}</p>
            </div>
          </section>
          <section className="My-Img">
            <h3>Sube una imagen</h3>
            <Button onClick={()=> handleOpen("2")}>+</Button>
            <Modal
              open={open.open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                
                <form className="formmodal" onSubmit={handleSubmit}>
                  <input type="file" onChange={handleFileSelect} />
                  <input type="submit" value="Upload File" />
                </form>
              </Box>
            </Modal>
            <TabContext  value={value} >
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Subidas" value="1" />
                <Tab label="Favoritas" value="2" />
              </TabList>
              <TabPanel value="1" >
                <div className="Perfil-gallery">
                  {
                    img.map(item => (
                      <div key={item._id} className="Perfil-gallery-img">
                        <img src={item.image.secure_url} alt={item.title}>
                        </img>
                        <span className="Perfil-gallery-img-description">{item.description}</span>
                      </div>
                    ))
                  }
                </div>
              </TabPanel >
              <TabPanel value="2" >
                <div className="Perfil-gallery">
                  {
                    favs.map(item => (
                      <div key={item._id} className="Perfil-gallery-img">
                        <img src={item.secure_url} alt="b">
                        </img>
                        <span className="Perfil-gallery-img-description">Hola hola que tal</span>
                      </div>
                    ))
                  }
                </div>
              </TabPanel >
            </TabContext>
          </section>
        </div>
      </div>
    );

  }
}

export default Perfil;