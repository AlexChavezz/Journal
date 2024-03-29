import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutLogo from '../../pictures/logout_white_24dp.svg';
import { startLogout } from '../../actions/auth';
import { emptyNotes } from '../../actions/notes';
import { emptyTodos } from '../../actions/todo';
import { Link } from 'react-router-dom';
import policyLogo from '../../pictures/policy_white_24dp.svg'; 
import accountImg from '../../pictures/account_circle_white_24dp.svg';
import { onCloseModal } from '../../helpers/onCloseModal';
import { useRef } from 'react';

export const ModalOptions = ({ setoptionsModal }) => {
    const dispatch = useDispatch();
    const {photoURL,name} = useSelector(state => state.auth);
    const handleSingout = () => {
        dispatch(startLogout());
        dispatch(emptyTodos());
        dispatch(emptyNotes());
    }
    const elementToAnimateRef = useRef();
    const animation = () => {
        elementToAnimateRef.current.animate([
            {transform: 'translateY(0px)'},
            {opacity: 1},
            {transform: 'translateY(-10px)'},
            {opacity: 0}
        ], {
            duration: 200
        })
    }
    return (
        <div 
        className="background"
        onClick={(e) =>onCloseModal(e.target, "background", setoptionsModal, {current: animation, time: 150})}
        >
            <div className="dropdown-content"
            ref={elementToAnimateRef}
            >
                <div
                    className="user-option"
                >
                    <img src={photoURL} alt="photoURL" className="img-user" draggable="false"/>
                    <p className="logout">{name}</p>
                </div>
                <hr  className="hr"/>
                <Link to="/journal/myaccount">
                <div
                    className="option account-option"
                >
                    <img src={accountImg} alt="account-logo" />
                    <p className="logout">Account</p>
                </div>                
                </Link>
                <Link to="/privacy-policy">
                <div className="option">
                    <img src={policyLogo} alt="policy-logo" />
                    <p>Privacy Policy</p>
                </div>
                </Link>
                <div
                    className="option"
                    onClick={handleSingout}
                >
                    <img src={LogoutLogo} alt="loguout-logo" />
                    <p className="logout">Logout</p>
                </div>
            </div>
        </div >
    )
}
