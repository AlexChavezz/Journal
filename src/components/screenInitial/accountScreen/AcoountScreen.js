import React, { createRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteAccoout, updateDisplayNameAsync } from '../../../actions/auth';
import { deleteAllTodoAsync } from '../../../actions/todo';
import { useForm } from '../../../hooks/useForm';
import close_button from '../../../pictures/close_black_24dp.svg';



export const AcoountScreen = () => {

    const dispatch = useDispatch();
    const { photoURL, name } = useSelector(state => state.auth);
    const [ disabled, setdisabled ] = useState(true);
    const [ modal, setmodal ] = useState(false);
    const [ { name: nombre }, handleInputChange, setValues ] = useForm({
        name,
    });
    const nameref = useRef(nombre);
    const ref = createRef();

    const handleChangeStatus = () => {
        setdisabled(false);
        ref.current.focus();
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if (nombre === nameref.current) {
            setdisabled(true);
        } else {
            setdisabled(true);
            dispatch(updateDisplayNameAsync(nombre));
            nameref.current = nombre;
        }
    }
    const handleCancel = () => {
        setValues({
            name: nameref.current,
        });
        setdisabled(true);
    }
    const handleDeleteAccount = () => {
        dispatch(deleteAccoout());
        dispatch(deleteAllTodoAsync());
    }
    const handleShowModal = () => {
        setmodal(!modal);
    }

    return (
        <div className="container-account">
            <section>
                <article>
                    <img src={photoURL} alt="photoURL" />
                    <span>{nombre}</span>
                </article>
                <article>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                disabled={disabled}
                                className={disabled ? 'disabled' : 'input'}
                                name="name"
                                value={nombre}
                                onChange={handleInputChange}
                                ref={ref}
                            />
                            {
                                disabled ? (

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleChangeStatus}
                                    >Change</button>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-secoundary"
                                            onClick={handleUpdate}
                                        >Update</button>

                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={handleCancel}
                                        >Cancel</button>
                                    </>
                                )
                            }
                        </label>
                    </form>
                </article>
                <span>CAUTION: DANGER ZONE</span>
                <article className="danger-zone">
                    <button onClick={handleShowModal} >
                        Delete this account
                    </button>
                </article>
            </section>
            {
                modal &&
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
                            If you click on the button below, your account will be deleted along with all the data.
                        </div>
                        <button
                        onClick={ handleDeleteAccount }
                        >
                            Yes i'm sure !
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
