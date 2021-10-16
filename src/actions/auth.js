import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    deleteUser,
    FacebookAuthProvider,
    getAuth,
    updatePassword,
    reauthenticateWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase_config";
import { types } from '../types/types';
import { finishLoading } from "./ui";
import Swal from 'sweetalert2'
import { stopLoadingPage } from "./loading";
import photoURL from '../pictures/default-user.jpg';
import { fileUpload } from "../helpers/fileUpload";

export const registerWithEmailAndPasword = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
            updateProfile(auth.currentUser, {
                displayName: name,
            }).then(() => {
                dispatch(login(user.uid, user.displayName, photoURL))
                dispatch(stopLoadingPage())
            });
        }).catch(res => {
            dispatch(stopLoadingPage())
            res.message === 'Firebase: Error (auth/email-already-in-use).' ?
                Swal.fire('Error', 'Email is already register', 'Error')
                :
                Swal.fire('Error', 'there was an error, try again', 'Error')
        })

    }
}
export const LoginWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName, photoURL))
                dispatch(finishLoading());
                dispatch(stopLoadingPage());
            })
            .catch((e) => {
                dispatch(finishLoading());
                dispatch(stopLoadingPage());

                e.message === "Firebase: Error (auth/user-not-found)." ? Swal.fire('ERROR', 'This user does not exist', 'error')
                    :
                    Swal.fire('ERROR', 'It was at error try again', 'ERROR')
            });
    }
}
export const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return (dispatch) => {
        signInWithRedirect(auth, provider)
            .then((user) => {
                console.log(user)
                const { uid, displayName, photoURL } = user;
                dispatch(login(uid, displayName, photoURL))
            })
            .catch(error => console.log(error))
    }
}
export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return (dispatch) => {
        signInWithRedirect(auth, provider)
            .then(({ user }) => {
                const { uid, displayName, photoURL } = user;
                dispatch(login(uid, displayName, photoURL));
            })
            .catch(error => {
                Swal.fire('error', 'It was at error try again', 'error');
            })
    }
}
export const startLogout = () => {
    return (dispatch) => {
        signOut(auth).then(() => {
            dispatch(logout());
        })
    }
}
export const updateUserPassword = (newPassword) => {
    return (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(auth.currentUser)
        updatePassword(user, newPassword).then(() => {
            Swal.fire('success', 'Password Updated Successfully', 'success');
        }).catch((error) => {
            dispatch(startLogout());
            Swal.fire('error', 'You hav to revalidate your credentials', 'ERROR');
        });
    }
}
export const updateDisplayNameAsync = (newName) => {
    return (dispatch) => {
        updateProfile(auth.currentUser, {
            displayName: newName,
        }).then(() => {
            Swal.fire('success', 'Name Updated Successfully', 'success');
            dispatch(updateDisplayName(newName));
        }).catch(() => {
            Swal.fire('error', 'It was at error try again', 'error');
        });
    }
}
export const deleteAccoout = () => {
    return (dispatch) => {
        const providerCurrent = getProvider();
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            Swal.fire('success', 'Accoount Eliminated Successfully', 'success');
        }).catch(() => {
            if( providerCurrent === "password" ){
                Swal.fire('error', 'You have to login again', 'error');
                dispatch(startLogout());
            }else{
                Swal.fire('error', 'You hav to revalidate your credentials', 'error');
            }
        })
    }
}
export const getProvider = () => {
    let provider = '';
    const user = auth.currentUser;
    if (user !== null) {
        user.providerData.forEach(({ providerId }) => {
            provider = providerId;
        });
    }
    return provider;
}
export const reauthenticate = () => {
    return (dispatch) => {
        const providerCurrent = getProvider();
        let provider;
        const user = auth.currentUser;

        if (providerCurrent === 'google.com') {
            provider = new GoogleAuthProvider();
        }else if( providerCurrent === 'facebook.com'){
            provider = new FacebookAuthProvider();
        }

        reauthenticateWithPopup(user, provider)
            .then(() => {
                 Swal.fire('success', 'user credentials authenticated', 'success');
            }).catch(() => {
                Swal.fire('error', 'user credentials do not match', 'error');
            })
    }
}
export const startUploadNewPhoto = (file) => {
    return async (dispatch, getstate) => {
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const fileurl = await fileUpload( file );
        updateProfile(auth.currentUser, {
            photoURL: fileurl,
        });
        dispatch(updatephotoURL(fileurl));
        Swal.close();
        Swal.fire('success', 'Photo Updated Successfully', 'success');
    }
}
const updateDisplayName = (newName) => ({
    type: types.changeName,
    payload: newName,
});
const updatephotoURL = (photoURL) => ({
    type: types.changephotoURL,
    payload: photoURL
})

export const login = (uid, displayName, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        photoURL
    }
});
const logout = () => ({
    type: types.logout
})
