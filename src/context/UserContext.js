import React, {useEffect, useState} from 'react';
import axios from 'axios';
const Context = React.createContext({})

export function UserContextProvider({children}){

    const [favs, setFavs] = useState([])
    const [jwt, setJwt] = useState(() =>   window.sessionStorage.getItem('jwt') )
    const [userid, setUserid] = useState('')

    useEffect(()=>{
      
        if(!jwt) return setFavs([])
        
       // axios.get(`http://localhost:3000/favs`, {
        axios.get(`https://quinteresback-production.up.railway.app/favs`, {
            headers: {
              'Authorization': jwt
            }
          })
            .then(res => {
                
                setFavs(res.data.favs)
                setUserid(res.data.user)
            })
            .catch(err => console.error(err));

    }, [jwt])
    return <Context.Provider value={{
        favs,
        jwt,
        userid,
        setFavs,
        setJwt,
        setUserid
        
        }}>
        {children}
        </Context.Provider> 
}

export default Context