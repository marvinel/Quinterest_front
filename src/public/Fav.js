import React from "react";
import useUser from "../useUser";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
export default function Fav({ id }) {
  let navigate = useNavigate();
  const { isLogged, addfav, favs } = useUser();
  const isFaved = favs.some(favId => favId.imgid === id)

  const handleClick = () => {
    if (!isLogged) navigate(`/login`);
    else addfav({ id })
  }
  const [
    label,
    emoji
  ] = isFaved
      ? [
        'Remove Image',
        <BookmarkIcon color="primary" />
      ] : [
        'Add Image',
        <BookmarkBorderIcon color="primary" />
      ]
  return <Tooltip title={label}>
    <IconButton onClick={handleClick} >{emoji}</IconButton>
  </Tooltip>

}

