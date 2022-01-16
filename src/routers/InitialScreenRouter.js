import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AcoountScreen } from '../components/screenInitial/accountScreen/AcoountScreen';
// import { HomeScreen } from '../components/screenInitial/homeScreen/HomeScreen';
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
    const sideBarRef = React.createRef();
    // useLayoutEffect(() => {
    //     console.log(sideBarRef)
    // }, [])
    // const handleClose = () => {
    //     sideBarRef.current.animate([
    //         { backgroundColor: 'red', }
    //     ], {
    //         duration: 200
    //     });
    //     setTimeout(() => {
    //         setSideBar(false)
    //     }, 150)
    // }
    const hiddeBarNav = () => {
        sideBarRef.current.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-100%)' },
        ], {
            duration: 200
        });
        setTimeout(() => {
            sideBarRef.current.style.display = "none";
            setSideBar(false);
        }, 190);
    }

    const showBarNav = () => {
        sideBarRef.current.animate([
            { transform: 'translateX(-100%)' },
            { transform: 'translateX(0%)' },
        ], {
            duration: 200
        });
        sideBarRef.current.style.display = "block";
        setSideBar(true);
    }
    return (

        <div
            className="journal"
        >

            <Header />

            <div className="flex">
                {/* {
                    sideBar && */}
                <BarNav
                    ref={sideBarRef}
                    // sideBar={sideBar}
                    toggleSideBar={toggleSideBar}
                    // setSideBar={setSideBar}
                    hiddeBarNav={hiddeBarNav}
                />
                {/* } */}

                <ToggleSideBar sideBar={sideBar} hiddeBarNav={hiddeBarNav} showBarNav={showBarNav} />


                <Switch>
                    {/* <Route exact path="/journal" component={HomeScreen} /> */}
                    <Route exact path="/journal/toDo" component={TodoScreen} />
                    <Route exact path="/journal/notes" component={NotesScreen} />
                    <Route exact path="/journal/paperbin" component={RecycleScreen} />
                    <Route exact path="/journal/paperbin/todos" component={RecycleScreenTodos} />
                    <Route exact path="/journal/paperbin/notes" component={RecycleScreenNotes} />
                    <Route exact path="/journal/myaccount" component={AcoountScreen} />
                    <Redirect exact to="/journal/toDo" />
                </Switch>
            </div>

        </div>
    )
}
