import React, { useState } from 'react'
import { ModalNotesPendings } from './ModalNotesPendings';
export const PendingTodos = (props) => {

  const [ modal, setmodal ] = useState(false);

  const handleChangeStatus = () => {
    setmodal(!modal);
  }

  return (
    <>
      <article
        className="note"
        onClick={handleChangeStatus}
      >
        <p>{props.title}</p>
      </article>
      {
        modal && <ModalNotesPendings handleChangeStatus={handleChangeStatus} {...props} />
      }
    </>
  );
}
