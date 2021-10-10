import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutLogo from '../../logout_white_24dp.svg';
import { startLogout } from '../../actions/auth';
import { emptyNotes } from '../../actions/notes';
import { emptyTodos } from '../../actions/todo';

export const ModalOptions = ({ handleChangeStatus }) => {
    const dispatch = useDispatch();
    const {photoURL,name} = useSelector(state => state.auth);
    const handleSingout = () => {
        dispatch(startLogout());
        dispatch(emptyTodos());
        dispatch(emptyNotes());
    }
    return (
        <div 
        className="background"
        onClick={handleChangeStatus}
        >
            <div className="dropdown-content"
            >
                <div
                    className="user-option"
                >
                    <img src={photoURL} alt="photoURL" className="img-user" draggable="false"/>
                    <p className="logout">{name}</p>
                </div>
                <hr  className="hr"/>
                <div
                    className="option"
                    onClick={handleSingout}
                >
                    <img src={LogoutLogo} alt="loguoutLogo" />
                    <p className="logout">Logout</p>
                </div>
                {/* <div
                                className="option"
                                onClick={handleUpdatePassword}
                            >
                                <p className="logout">Update Password</p>
                            </div> */}
            </div>
        </div >
    )
}
