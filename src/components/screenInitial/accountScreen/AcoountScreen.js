import React, { createRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteAccoout, updateDisplayNameAsync } from '../../../actions/auth';
import { deleteAllTodoAsync } from '../../../actions/todo';
import { useForm } from '../../../hooks/useForm';

export const AcoountScreen = () => {
    
    const dispatch = useDispatch();
    const {photoURL, name} = useSelector(state => state.auth);
    const [disabled, setdisabled] = useState(true);

    const [ {name: nombre}, handleInputChange, setValues ] = useForm({
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
        if( nombre === nameref.current ){
            setdisabled(true);
        }else{
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
        // dispatch(deleteAccoout());
        // dispatch(deleteAllTodoAsync());
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
                        className={disabled? 'disabled': 'input'}
                        name="name"
                        value={nombre}
                        onChange={handleInputChange}
                        ref={ref}
                        />
                        {
                            disabled ?(

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
                                onClick={ handleCancel }
                                >Cancel</button>
                                </>
                            )
                        }
                        </label>
                    </form>
                </article>
                <span>CAUTION: DANGER ZONE</span>
                <article className="danger-zone">
                   <button onClick={handleDeleteAccount} >
                        Delete this account
                   </button>
                </article>
            </section>
        </div>
    )
}
