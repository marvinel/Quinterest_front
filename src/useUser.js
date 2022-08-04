import { useCallback, useContext } from "react";
import { set } from "react-hook-form";

import Context from "./context/UserContext";

export default function useUser () {
    const {favs,jwt,setFavs, setJwt} = useContext(Context)

    const login = useCallback((user) => {
        setJwt(user.token)
        window.sessionStorage.setItem('jwt', JSON.stringify(user.token));
    },[])

    const logout = useCallback(() => {  
        setJwt(null)
        window.sessionStorage.removeItem('jwt');
    },[setJwt])

    const addfav = useCallback(({id}) => {
        setFavs([id])
    }, [jwt, setFavs])

    return {
        addfav,
        favs,
        isLogged: Boolean(jwt),
        login,
        logout
    }
 }