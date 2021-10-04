import React from 'react';
import { useSelector } from 'react-redux';
import { getTodosPendings } from '../../../helpers/getTodosPendings';
import { PendingTodos } from '../todoScreen/PendingTodos';

export const HomeScreen = () => {
    const { state } = useSelector(state => state.todos);
    const { name } = useSelector(state => state.auth);
    const items = getTodosPendings(state);


    return (
        <div className="container_home">
            <div className="container_home text">
                <h3>Hello  <b>{name}</b></h3>
                <p>This is the Perfect place to save whatever you want.</p>
                <hr />

                {
                    items.length !== 0 ?
                        (
                            <section className="section">
                                <h3>You have {items.length} pending tasks</h3>
                                <table className="home_table">
                                    <thead>
                                        <tr>
                                            <th>
                                                TITLE
                                            </th>
                                            <th>
                                                DESCRIPTION
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            state.map(todo => todo.done === false && <PendingTodos {...todo} key={todo.id} />)
                                        }
                                    </tbody>
                                </table>

                            </section>
                        ) : ( 
                            <div className="alert_witout_pendings">
                                Congratulations! You have 0 Pendings
                            </div>
                    )
                }

            </div>
            <div className="footer">
                <p>Developed by Alexis Chavez</p><br />
                <span>More about my work <a href="https://alexchavezz.github.io/PORTAFOLIO/" target="_black">Here!</a></span>
            </div>
        </div>
    );
}
