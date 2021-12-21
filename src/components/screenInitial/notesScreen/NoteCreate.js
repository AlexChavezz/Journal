import React, { useState } from 'react'
import { ActiveNote } from './ActiveNote';

export const NoteCreate = (props) => {
    const [state, setstate] = useState(false);

    const handleActive = () => {
        setstate(true);
    }

    return (
        <>
            <div
                className="target"
                onClick={handleActive}
            >
                <p>{props.note}</p>
            </div>
            {
                state &&
                <ActiveNote {...props} setstate={setstate}/>
            }
        </>
    )
}
