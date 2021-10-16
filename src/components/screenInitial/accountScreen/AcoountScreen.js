import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { ContentInformation } from './ContentInformation';
import { ModalDeleteAccount } from './ModalDeleteAccount';

export const AcoountScreen = () => {

    const [ modal, setmodal ] = useState(false);
    const { photoURL, name } = useSelector(state => state.auth);
    const [ values, handleInputChange, setValues ] = useForm({
        name,
        password: '',
    });
    const handleShowModal = () => {
        setmodal(!modal);
    }

    return (
        <div className="container-account">
            <section>
                <article>
                    <img src={photoURL} alt="photoURL" />
                    <span>{values.name}</span>
                </article>
                <ContentInformation setValues={setValues} values={values} handleInputChange={handleInputChange}/>
                <span className="caution">CAUTION: DANGER ZONE</span>
                <article className="danger-zone">
                    <button onClick={handleShowModal} >
                        Delete this account
                    </button>
                </article>
            </section>
            {
                modal && <ModalDeleteAccount handleShowModal={handleShowModal} />
            }
        </div>
    )
}
