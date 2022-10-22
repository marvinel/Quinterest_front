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

    //TOGGLE CLASE ACTIVO
   


    const showMenu = () =>{
        const nav = document.querySelector("Nav")     
            nav.classList.toggle('activo');      
    }
    return (
        <div className="Header">
           {/** 
            <div className="Logo">
                <img src="https://www.discordianos.com/uploads/monthly_2021_02/530-5304871_akatsuki-logo-png-akatsuki-png.png.e7bb5a6d69955eff361aa86c90d33695.png" alt="logo" />
            </div>  */}    
                <div className="MenuH" onClick={showMenu}> <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"/></svg>
                    </div>
               
                <nav className="Nav">
                    <ul>
                    <Link to="/"><li className="item-header" >Home</li></Link>
                     {isLogged
                       ?<Link to={"/perfil/"+userid}>  <li className="item-header">Profile</li></Link>
                       : <Link to={"/login"}>  <li className="item-header">Profile</li></Link>
                    } 
                       {isLogged
                       ?<li><button className="Logout" onClick={logout}>Sign out</button></li>
                       : <Link to="/login"><li className="item-header"> Sign In</li></Link>
                    } 
                    </ul>
                </nav>
                
            </div>
 
        
    );
}

export default Header;