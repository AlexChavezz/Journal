import React, { createRef, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startUploadNewPhoto, updateDisplayNameAsync, updateUserPassword } from '../../../actions/auth';
import showPasswordLogo from '../../../pictures/visibility_black_24dp.svg';
import hiddenPasswordLogo from '../../../pictures/visibility_off_black_24dp.svg';
import { getProvider } from '../../../actions/auth';

export const ContentInformation = ({ setValues, values, handleInputChange }) => {

    const dispatch = useDispatch();
    const [ disabled, setdisabled ] = useState(true);
    const [ isPassword, setisPassword ] = useState(true);
    const nameref = useRef(values.name);
    const ref = createRef();

    const provider = getProvider();

    const handleChangeStatus = () => {
        setdisabled(false);
        ref.current.focus();
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if (values.name === nameref.current) {
            setdisabled(true);
        } else {
            setdisabled(true);
            dispatch(updateDisplayNameAsync(values.name));
            nameref.current = values.name;
        }
    }
    const handleCancel = () => {
        setValues({
            ...values,
            name: nameref.current,
        });
        setdisabled(true);
    }

    const handleFileChange = (e) => {
        let file = e.target.files[ 0 ];
        if (file) {
            dispatch(startUploadNewPhoto(file))
            file = ''
            
        }
    }
    const handleChangeToTypeText = () => {
        setisPassword(!isPassword)
    }
    const handleUpdatePassword = () => {
        dispatch(updateUserPassword(values.password));
        setValues({
            ...values,
            password:''
        })
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
                        value={values.name}
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
                <label>
                    Photo:
                    <input
                        type="file"
                        className="file"
                        name="file"
                        onChange={handleFileChange}
                        accept=" .jpg, .svg, .png"
                    />

                </label>
                {
                    provider === 'password' &&
                    <div className="password-container">
                        <label className="label-password">
                            Password:
                            <input
                                type={isPassword ? "password" : "text"}
                                className="password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                            {/* {
                        values.password.length > 0 && inputType.type === 'password' &&
                        
                        <img
                        onClick={handleChangeToTypeText} 
                        src={showPasswordLogo} 
                        alt="show-password-logo" 
                        />
                        :
                        inputType.type === 'pass'&& 
                        <img 
                        src={hiddenPasswordLogo} 
                        alt="show-password-logo" 
                        />
                            
                        
                    } */}
                            {
                                isPassword && values.password.length > 0 ?
                                    <img
                                        onClick={handleChangeToTypeText}
                                        src={showPasswordLogo}
                                        alt="show-password-logo"
                                    />
                                    :
                                    <>
                                    {
                                        !isPassword &&
                                    <img
                                        onClick={handleChangeToTypeText}
                                        src={hiddenPasswordLogo}
                                        alt="show-password-logo"
                                    />
                                    }
                                    </>
                            }

                        </label>
                       {
                        values.password.length >= 6 &&
                        <button
                            type="button"
                            className="btn btn-primary"
                        onClick={handleUpdatePassword}
                        >Change</button>}
                    </div>
                }
            </form>
        </article>
    )
}
