import React, { useEffect, useState } from "react";
import axios from 'axios';

function Header() {



    useEffect(() => {

    }, []);


    return (
        <div className="Header">
            <div className="Logo">
                <img src="https://www.discordianos.com/uploads/monthly_2021_02/530-5304871_akatsuki-logo-png-akatsuki-png.png.e7bb5a6d69955eff361aa86c90d33695.png" alt="logo" />
            </div>
            
                <nav className="Nav">
                    <ul>
                        <li>Inicio</li>
                        <li>Perfil</li>
                        <li>Cerrar sesion</li>
                    </ul>
                </nav>
            





        </div>
    );


}

export default Header;