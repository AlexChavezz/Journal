import React from 'react';
import menuLight from '../../../pictures/menu_white_24dp.svg';
export const ToggleSideBar = ({ sideBar, hiddeBarNav, showBarNav }) => {


    const toggleSideBarNav = () => {
        if(sideBar) {
            hiddeBarNav();
        }else{
            showBarNav();
        }
    }


    return (
        <div
            className="toggle-sidebar" 
            onClick={toggleSideBarNav}
            // onMouseOver={() => setstate(true)}
            // onMouseOut={() => setstate(false)}
        >
            {/* { */}
                 {/* state ? */}
                {/* (<img src={menuDark} alt="menuDark" />) */}
                {/* : */}
                <img src={menuLight} alt="menuLight" />
            {/* } */}
        </div>
    )
}
