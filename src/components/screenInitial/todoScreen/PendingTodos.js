import React from 'react'

export const PendingTodos = (props) => {
    return (
      <tr>
          <td>{props.index + 1}</td>
          <td>{props.title}</td>
          <td>{props.description}</td>
      </tr>
    )
}
