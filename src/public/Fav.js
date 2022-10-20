import React from "react";
import useUser from "../useUser";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
export default function Fav({ id, lugar }) {
  let navigate = useNavigate();
  const { isLogged, addfav,deletefav, favs } = useUser();
  const isFaved = favs?.some((favId) => favId.imgid === id);

  const handleClick = () => {
    if (!isLogged) navigate(`/login`);
    else if(isFaved) deletefav({ id });
    else addfav({ id });
  };
  const [label, emoji] = isFaved
    ? ["Guardado", <BookmarkIcon color="primary" />]
    : ["Guardar", <BookmarkBorderIcon color="primary" />];
  return (
    <>{lugar === 'detalle' ?
    <button className={label} onClick={handleClick}>{label}</button>:
    <Tooltip title={label}>
    <IconButton onClick={handleClick}>{emoji}</IconButton>
  </Tooltip>
    }
     
    </>
  );
}
