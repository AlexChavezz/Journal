import React from 'react';
import close_button from '../../../pictures/close_black_24dp.svg';
import { deleteAccoout, reauthenticate } from '../../../actions/auth';
import { deleteAllTodoAsync } from '../../../actions/todo';
import { useDispatch } from 'react-redux';


export const ModalDeleteAccount = ({handleShowModal}) => {
    const dispatch = useDispatch();
    const handleDeleteAccount = () => {
        dispatch(deleteAccoout());
        dispatch(deleteAllTodoAsync());
    }
    const handleReauthorize = () => {
        dispatch(reauthenticate());
    }
    return (
        <div className="background">
            <div className="delete-account-modal">
                <img
                    src={close_button}
                    alt="close-button"
                    onClick={handleShowModal}
                />
                <div className="alert danger">
                    Are you sure ?
                </div>
                <div className="alert info">
                    If you click on the button below, your account will be deleted along with all the data permanently.
                </div>
                <button
                    onClick={handleDeleteAccount}
                >
                    Yes i'm sure !
                </button>
                <button
                className="revalidate"
                    onClick={handleReauthorize}
                >
                    validate credentials
                </button>
            </div>
        </div>
    );
}
