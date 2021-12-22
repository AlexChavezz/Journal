import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import manageAccoutLogo from '../../../pictures/manage_accounts_white_24dp.svg';
import { ModalOptions } from '../ModalOptions';
import searchLogo from '../../../pictures/search_black_24dp.svg';
import { useForm } from '../../../hooks/useForm';
import { SearchResults } from '../search/SearchResults';
import close from '../../../pictures/close_black_24dp.svg';

export const Header = () => {

    const { name } = useSelector(state => state.auth);
    const [optionsModal, setoptionsModal] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleChangeStatus = () => {
        setoptionsModal(!optionsModal);
    }
    const [{ keyWord }, handleInputChange, ,reset] = useForm({
        keyWord: '', 
    });

    useEffect(() => {

        if (keyWord.trim().length > 0) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }

    }, [keyWord])

    return (
        <header className="journal-header">
            {/* <div className="menu"
            // onClick={handleShowAside}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div> */}
            {/* Component to search anything */}
            {
                isSearching &&
                <SearchResults keyWord={keyWord} />
            }

            <div className="search">
                <img src={searchLogo} alt="lupa" />
                <input
                    type="text"
                    placeholder="Type to search"
                    name="keyWord"
                    value={keyWord}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                {
                    keyWord.trim().length > 0 &&
                    <img
                        src={close}
                        alt="close"
                        className="input-clear"
                        onClick={()=> reset()}
                    />
                }
            </div>
            <div className="user dropdown">
                <span
                    className="displayName"
                    onClick={handleChangeStatus}
                >
                    <span> {name}</span>

                    <img src={manageAccoutLogo} alt="accountLogo" />
                </span>


            </div>
            {
                optionsModal && <ModalOptions handleChangeStatus={handleChangeStatus} />
            }
        </header>
    )
}
