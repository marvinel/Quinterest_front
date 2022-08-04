import { useCallback, useContext } from "react";
import axios from 'axios';

import Context from "./context/UserContext";

export default function useUser() {
    const { favs, jwt, setFavs, setJwt } = useContext(Context)

    const login = useCallback((user) => {
        setJwt(user.token)
        window.sessionStorage.setItem('jwt', user.token);
    }, [setJwt])

    const logout = useCallback(() => {
        setJwt(null)
        window.sessionStorage.removeItem('jwt');
    }, [setJwt])

    const addfav = useCallback(({ id }) => {
        console.log(jwt)
        axios.post(`http://localhost:3000/addfav/${id}`, {
            token: jwt
        })
            .then(res => {
                console.log(res.data);
                setFavs(res.data.favs)
            })
            .catch(err => console.error(err));
    }, [jwt, setFavs])

    return {
        addfav,
        favs,
        isLogged: Boolean(jwt),
        login,
        logout
    }
}