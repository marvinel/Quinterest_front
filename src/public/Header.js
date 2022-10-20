import React from "react";
import {Link} from 'react-router-dom';

import useUser from "../useUser";
 
function Header() {
    const {isLogged, logout,userid} = useUser();
  
    window.onscroll = function(){
        const hed = document.querySelector('.Header')
        if(window.scrollY === 0){
            hed.style.boxShadow = 'none'

        }else{
            hed.style.boxShadow = '0px 15px 15px 0px rgba(40, 44, 52, 0.178)'
        }

    }

    return (
        <div className="Header">
           {/** 
            <div className="Logo">
                <img src="https://www.discordianos.com/uploads/monthly_2021_02/530-5304871_akatsuki-logo-png-akatsuki-png.png.e7bb5a6d69955eff361aa86c90d33695.png" alt="logo" />
            </div>  */}    
            <div>
                <nav className="Nav">
                    <ul>
                    <Link to="/"><li className="item-header" >Inicio</li></Link>
                   
                    {isLogged
                       ?<Link to={"/perfil/"+userid}>  <li className="item-header">Perfil</li></Link>
                       : <Link to={"/login"}>  <li className="item-header">Perfil</li></Link>
                    } 
                       {isLogged
                       ?<li><button className="Logout" onClick={logout}>Logout</button></li>
                       : <Link to="/login"><li className="item-header"> Iniciar sesion</li></Link>
                    } 
                    </ul>
                </nav>
                </div>
            </div>
 
        
    );
}

export default Header;