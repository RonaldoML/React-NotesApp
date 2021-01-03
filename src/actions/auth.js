import { types } from "../types/types";
import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui";
import { noteLoggout } from "./notes";


//Se crea una acción que dispara otra acción cuando se resuelve la tarea asíncrona
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(
                    
                    login(user.uid, user.displayName)

                )
                dispatch(finishLoading());
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
                dispatch(finishLoading());
                
            });

    }
}

//Crea la autenticación al registrar un usuario
export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(

                    login(user.uid, user.displayName)

                )
            }).catch(err => {
                console.log(err)
                Swal.fire('Error', err.message, 'error');
            });

    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(

                    login(user.uid, user.displayName)

                )
            });
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {

    return async ( dispatch ) => {

        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLoggout() );
    }

}

export const logout = () => ({
    type: types.logout
})