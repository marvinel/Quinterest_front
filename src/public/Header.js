import React, { useEffect, useState } from "react";

import {Link} from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(false)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userConexion'));
        if (user) {
         console.log("Usuario loggeado")
        setUser(true)
        }else{
            console.log("Usuario Desconectadoa")        
        }
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
                       {user
                       ?<li><button onClick={()=> {console.log("aca se quita el local"); localStorage.removeItem('userConexion'); setUser(false)}}>Cerrar session</button></li>
                       : <li > <Link to="/login">Iniciar sesion</Link></li>
                    } 
                    </ul>
                </nav>
        </div>
    );
}

export default Header;