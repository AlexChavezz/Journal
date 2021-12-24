import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { login } from '../actions/auth';
import { startLodingPage, stopLoadingPage } from '../actions/loading';
import { loadNotesAsync } from '../actions/notes';
import { loadTodosAsync } from '../actions/todo';
import { PrivacyPolicyScreen } from '../components/screenInitial/PrivacyPolicy/PrivacyPolicyScreen';
import { auth } from '../firebase/firebase_config';
import { AuthRouter } from './AuthRouter';
import { InitialScreenRouter } from './InitialScreenRouter';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import photoURL from '../pictures/default-user.jpg';



export const AppRouter = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.loading)
    useEffect(() => {
        onAuthStateChanged(auth, async ( user ) => {
            if( user?.uid ){
                dispatch(login(user.uid, user.displayName, user.photoURL || photoURL));
                setLoggedIn(true);
                dispatch(startLodingPage());
                await dispatch(loadTodosAsync(user.uid));
                await dispatch(loadNotesAsync(user.uid));
            }else{
                setLoggedIn(false);
            }
            dispatch(stopLoadingPage());
        });
    }, [dispatch, setLoggedIn]);

    if( loading ){
        return (
            <div className="loading_container">
            <span className="loading style-2">.</span>
            </div>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                
                    <PublicRoutes 
                    path="/auth" 
                    component = { AuthRouter }
                    isAuthenticated = { isLoggedIn }
                    />
                    <PrivateRoutes 
                    path="/journal"
                    component = { InitialScreenRouter }
                    isAuthenticated = { isLoggedIn }
                    />
                    <Route path="/privacy-policy" component={ PrivacyPolicyScreen } />
                    <Redirect to="/auth/login"/>

                </Switch>
            </div>
        </Router>
    )
}
