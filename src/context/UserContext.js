import React, {useEffect, useState} from 'react';
import axios from 'axios';
const Context = React.createContext({})

export function UserContextProvider({children}){

    const [favs, setFavs] = useState([])
    const [jwt, setJwt] = useState(() =>   window.sessionStorage.getItem('jwt') )

    useEffect(()=>{
        if(!jwt) return setFavs([])

        axios.get(`http://localhost:3000/favs`, {
            headers: {
              'Authorization': jwt
            }
          })
            .then(res => {
                console.log(res.data);
                setFavs(res.data.favs)
            })
            .catch(err => console.error(err));
    }, [jwt])
    return <Context.Provider value={{
        favs,
        jwt,
        setFavs,
        setJwt
        }}>
        {children}
        </Context.Provider> 
}

export default Context