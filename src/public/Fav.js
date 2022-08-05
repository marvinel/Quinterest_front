import React from "react";
import useUser from "../useUser";


export default function Fav({id}){

    const {isLogged, addfav, favs} = useUser();
   const isFaved = favs.some(favId => favId === id)

    const handleClick= () =>{
        if(!isLogged) console.log("Manda al login")
        console.log( id, typeof( favs))
       addfav({id})
    }
    const [
        label,
        emoji
      ] = isFaved 
      ? [
        'Remove Image',
        '❌'
      ]:[
        'Add Image',
        '💗'
      ]
    return <button onClick={handleClick}><span aria-label={label}>{emoji}</span></button>
}