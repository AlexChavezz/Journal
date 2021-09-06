import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { HomeScreen } from '../components/screenInitial/homeScreen/HomeScreen';
import { NotesScreen } from '../components/screenInitial/notesScreen/NotesScreen';
import { TodoScreen } from '../components/screenInitial/todoScreen/TodoScreen';

export const InitialScreenRouter = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const handleSingout = () => {
        dispatch(startLogout()) 
    }

    return (
        <div className="journal">

            <header className="journal-header">
                <div className="date">
                    <p className="date"> Today's : {new Date().getMonth() + 1} / {new Date().getDate()} / {new Date().getFullYear()} </p>
                </div>
                <h1>
                    JOURNAL
                </h1>
                <div className="user dropdown">
                    <span
                    >
                        {name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-arrow-down arrow" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                        </svg>
                    </span>
                    <div className="dropdown-content">
                        <div 
                        className="option"
                        onClick={ handleSingout }
                        >
                            <p className="logout">logout</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex">
                <aside>
                    <NavLink activeClassName="active" exact to="/journal" className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                            <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                        </svg>
                    </NavLink>
                    <NavLink activeClassName="active" to="/journal/toDo" className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-check2-square" viewBox="0 0 16 16">
                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg>
                    </NavLink>
                    <NavLink activeClassName="active" to="/journal/notes" className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-book" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                        </svg>
                    </NavLink>
                </aside>

                {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/journal/toDo">To do</Link>
        <Link to="/journal/notes">Notes</Link>
    </nav> */}



                <Switch>
                    <Route exact path="/journal" component={HomeScreen} />
                    <Route exact path="/journal/toDo" component={TodoScreen} />
                    <Route exact path="/journal/notes" component={NotesScreen} />
                    <Redirect exact to="/journal" />
                </Switch>
            </div>

        </div>
    )
}
