import React, {useState} from 'react';

const Context = React.createContext({})

export function UserContextProvider({children}){

    const [favs, setFavs] = useState(['1', '2'])
    const [jwt, setJwt] = useState(() =>   window.sessionStorage.getItem('jwt') )

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