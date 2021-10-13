import React, { createRef, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateDisplayNameAsync } from '../../../actions/auth';

export const ContentInformation = ({setValues, name, handleInputChange}) => {

    const dispatch = useDispatch();
    const [ disabled, setdisabled ] = useState(true);
   
    const nameref = useRef(name);
    const ref = createRef();

    const handleChangeStatus = () => {
        setdisabled(false);
        ref.current.focus();
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if (name === nameref.current) {
            setdisabled(true);
        } else {
            setdisabled(true);
            dispatch(updateDisplayNameAsync(name));
            nameref.current = name;
        }
    }
    const handleCancel = () => {
        setValues({
            name: nameref.current,
        });
        setdisabled(true);
    }

    return (
        <article>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        disabled={disabled}
                        className={disabled ? 'disabled' : 'input'}
                        name="name"
                        value={name}
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
    )
}
