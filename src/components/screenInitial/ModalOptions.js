import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutLogo from '../../pictures/logout_white_24dp.svg';
import { startLogout } from '../../actions/auth';
import { emptyNotes } from '../../actions/notes';
import { emptyTodos } from '../../actions/todo';
import { Link } from 'react-router-dom';
import policyLogo from '../.././pictures/policy_white_24dp.svg'; 

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
                    className="option logout-button"
                    onClick={handleSingout}
                >
                    <img src={LogoutLogo} alt="loguout-logo" />
                    <p className="logout">Logout</p>
                </div>
                <Link to="/privacy-policy">
                <div className="option">
                    <img src={policyLogo} alt="policy-logo" />
                    <p>Privacy Policy</p>
                </div>
                </Link>
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
