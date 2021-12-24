import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AcoountScreen } from '../components/screenInitial/accountScreen/AcoountScreen';
import { HomeScreen } from '../components/screenInitial/homeScreen/HomeScreen';
import { NotesScreen } from '../components/screenInitial/notesScreen/NotesScreen';
import { RecycleScreenNotes } from '../components/screenInitial/recycleScreen/notesRecycle/RecycleScreenNotes';
import { RecycleScreen } from '../components/screenInitial/recycleScreen/RecycleScreen';
import { RecycleScreenTodos } from '../components/screenInitial/recycleScreen/todosRecycle/RecycleScreenTodos';
import { TodoScreen } from '../components/screenInitial/todoScreen/TodoScreen';
import { BarNav } from '../components/screenInitial/UI/BarNav';
import { Header } from '../components/screenInitial/UI/Header';
import { ToggleSideBar } from '../components/screenInitial/UI/ToggleSideBar';

export const InitialScreenRouter = () => {

    const [sideBar, setSideBar] = useState(false);

    const toggleSideBar = () => {
        setSideBar(!sideBar);
    }


    return (
        <div
            className="journal"
        >

            <Header />

            <div className="flex">
                {
                   
                    <BarNav
                        sideBar={sideBar}
                        toggleSideBar={toggleSideBar}
                        setSideBar={setSideBar}
                    />
                }

                <ToggleSideBar toggleSideBar={toggleSideBar} sideBar={sideBar} />


                <Switch>
                    <Route exact path="/journal" component={HomeScreen} />
                    <Route exact path="/journal/toDo" component={TodoScreen} />
                    <Route exact path="/journal/notes" component={NotesScreen} />
                    <Route exact path="/journal/paperbin" component={RecycleScreen} />
                    <Route exact path="/journal/paperbin/todos" component={RecycleScreenTodos} />
                    <Route exact path="/journal/paperbin/notes" component={RecycleScreenNotes} />
                    <Route exact path="/journal/myaccount" component={AcoountScreen} />
                    <Redirect exact to="/journal" />
                </Switch>
            </div>

        </div>
    )
}
