import React, { useState } from 'react';
import menuLight from '../../../pictures/menu_white_24dp.svg';
import menuDark from '../../../pictures/menu_black_24dp.svg';
export const ToggleSideBar = ({ sideBar, toggleSideBar }) => {

    const [state, setstate] = useState(false);

    return (
        <div
            className={sideBar ? "toggle-sidebar" : "toggle-sidebar false"}
            onClick={toggleSideBar}
            onMouseOver={()=> setstate(true)}
            onMouseOut={()=>setstate(false)}
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
