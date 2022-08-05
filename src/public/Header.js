import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

import useUser from "../useUser";
 
function Header() {
    const {isLogged, logout} = useUser();
  
    useEffect(() => {
       
       
      }, []);

    return (
        <div className="Header">
            <div className="Logo">
                <img src="https://www.discordianos.com/uploads/monthly_2021_02/530-5304871_akatsuki-logo-png-akatsuki-png.png.e7bb5a6d69955eff361aa86c90d33695.png" alt="logo" />
            </div>     
                <nav className="Nav">
                    <ul>
                        <li ><Link to="/">Inicio</Link></li>
                        <li><Link to="/perfil/">Perfil</Link></li>
                       {isLogged
                       ?<li><button className="Logout" onClick={logout}>Logout</button></li>
                       : <li > <Link to="/login">Iniciar sesion</Link></li>
                    } 
                    </ul>
                </nav>
        </div>
    );
}

export default Header;