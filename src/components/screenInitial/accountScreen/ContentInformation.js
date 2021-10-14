import React, { createRef, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startUploadNewPhoto, updateDisplayNameAsync } from '../../../actions/auth';

export const ContentInformation = ({ setValues, values,  handleInputChange }) => {

    const dispatch = useDispatch();
    const [ disabled, setdisabled ] = useState(true);
    const [ inputFileButton ] = useState(true);
    const nameref = useRef(values.name);
    const ref = createRef();

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
    const handleCancelImg = () => {
        setValues({
            ...values,
            file: '',
        })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if( file ){
            dispatch(startUploadNewPhoto(file));
        }
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
                        value={values.file}
                        onChange={handleFileChange}
                        accept=" .jpg, .svg, .png"
                    />
                    <button
                        type="button"
                        className={values.file === '' ? "btn btn-disabeled" : "btn btn-primary" }
                        disabled={ values.file !== '' ? !inputFileButton : inputFileButton }
                    >Update</button>
                   
                        <button
                        onClick={handleCancelImg}
                        type="button"
                        className={values.file === '' ? "btn btn-disabeled" : "btn btn-danger" }
                        disabled={ values.file !== '' ? !inputFileButton : inputFileButton }
                    >Cancel</button>
                </label>
            </form>
        </article>
    )
}
