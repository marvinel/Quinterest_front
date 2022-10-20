import { useCallback, useContext } from "react";
import axios from 'axios';

import Context from "./context/UserContext";

export default function useUser() {
    const { favs, jwt, setFavs, setJwt, setUserid, userid } = useContext(Context)

    const login = useCallback((user) => {

        setUserid(user.id)
        setJwt(user.token)
        window.sessionStorage.setItem('jwt', user.token);
    }, [setJwt, setUserid])

    const logout = useCallback(() => {
        setJwt(null)
        window.sessionStorage.removeItem('jwt');
    }, [setJwt])

    const addfav = useCallback(({ id }) => {

        //axios.post(`http://localhost:3000/addfav/${id}`, {
        axios.post(`https://quinteresback-production.up.railway.app/addfav/${id}`, {
            token: jwt
        })
            .then(res => {
               
                setFavs(res.data.favs)

            })
            .catch(err => console.error("error: " + err));
    }, [jwt, setFavs])

    const deletefav = useCallback(({ id }) => {
       
        //axios.post(`http://localhost:3000/deletefavs/${id}`, {
        axios.post(`https://quinteresback-production.up.railway.app/deletefavs/${id}`, {
            token: jwt
        })
            .then(res => {
              
                setFavs(res.data.favs)

            })
            .catch(err => console.error("error: " + err));
    }, [jwt, setFavs])


    return {
        addfav,
        deletefav,
        favs,
        isLogged: Boolean(jwt),
        login,
        logout,
        userid,
        jwt
    }
}