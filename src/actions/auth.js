import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword, updateProfile, signOut, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase_config";
import { types } from '../types/types';
import { finishLoading } from "./ui";
import Swal from 'sweetalert2'
import { stopLoadingPage } from "./loading";

export const registerWithEmailAndPasword = (email, password, name) => {
    return ( dispatch ) => {
        createUserWithEmailAndPassword(auth, email, password).then( ({ user }) => {
            updateProfile(auth.currentUser, {
                displayName: name,
            }).then( () =>{
                dispatch(login( user.uid, user.displayName ))
                dispatch(stopLoadingPage())
            });
        }).catch(res => {
            dispatch(stopLoadingPage())
            res.message === 'Firebase: Error (auth/email-already-in-use).' ?
            Swal.fire('Error', 'Email is already register' ,'Error')
            :
            Swal.fire('Error', 'there was an error, try again', 'Error')
        })

    }
}
export const LoginWithEmailAndPassword = ( email, password ) => {
    return ( dispatch ) => {
        signInWithEmailAndPassword( auth, email, password )
        .then( ( { user } ) => {
            dispatch( login( user.uid, user.displayName ) )
            dispatch( finishLoading() );
            dispatch(stopLoadingPage());
        })
        .catch(( e ) => {
            dispatch( finishLoading() );
            dispatch(stopLoadingPage())

            e.message === "Firebase: Error (auth/user-not-found)."? Swal.fire('ERROR', 'This user does not exist','error') 
            :
            Swal.fire('ERROR', 'It was at error try again','ERROR')
        });
    }
}
export const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return ( dispatch ) => {
        signInWithRedirect(auth, provider)
        .then( (user) => {
            const { uid, displayName } = user;
            dispatch(login(uid, displayName))
        })
        .catch(error => console.log(error))
    }
}
export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return (dispatch) => {
        signInWithRedirect( auth, provider )
        .then( ({ user }) => {
            const { uid, displayName } = user;
            dispatch(login(uid, displayName))
        })
        .catch(error => console.log(error))
    }

}
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
});
export const startLogout = () => {
    return dispatch =>{
        signOut(auth).then( () => {
            dispatch(logout());
        });
    }
}
export const logout = () => ({
    type:types.logout
})
