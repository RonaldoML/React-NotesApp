import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui";


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
                console.log(err)
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
            }).catch(err => console.log(err));

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