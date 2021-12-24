import React from 'react';
// import comeBack from '../../../pictures/arrow_back_ios_black_24dp.svg';

export const ToggleSideBar = ({sideBar, toggleSideBar}) => {

    return (
        <div
        className={sideBar?"toggle-sidebar" :"toggle-sidebar false"}
        onClick={toggleSideBar}
        >
            <span>
                {
                    sideBar? "Hidde  ":"Show  "
                }
                SideBar
            </span>
        </div>
    )
}
