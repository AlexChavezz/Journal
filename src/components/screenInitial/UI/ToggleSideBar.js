import React, { useState } from 'react';
import menuLight from '../../../pictures/menu_white_24dp.svg';
import menuDark from '../../../pictures/menu_black_24dp.svg';
export const ToggleSideBar = ({ sideBar, hiddeBarNav, showBarNav }) => {

    const [state, setstate] = useState(false);

    const toggleSideBarNav = () => {
        if(sideBar) {
            hiddeBarNav();
        }else{
            showBarNav();
        }
    }


    return (
        <div
            className={sideBar ? "toggle-sidebar" : "toggle-sidebar false"}
            onClick={toggleSideBarNav}
            onMouseOver={() => setstate(true)}
            onMouseOut={() => setstate(false)}
        >
            {
                state ?
                (<img src={menuDark} alt="menuDark" />)
                :
                (<img src={menuLight} alt="menuLight" />)
            }
        </div>
    )
}
