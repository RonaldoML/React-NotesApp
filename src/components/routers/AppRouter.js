import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { login } from '../../actions/auth';
import { firebase } from '../../firebase/firebase-config';
import { JournalScreen } from '../journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    //Para mantener el estado del login
    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Se lanza cada vez que se cambia el usuario autenticado
    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn( true );
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        })

    }, [dispatch, setChecking, setIsLoggedIn]);
//se muestra una pantalla de espera mientras se autentica en firebase
    if( checking ){
        return (
            <h1>Espere...</h1>
        )
    }

    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={isLoggedIn} path="/auth/login" component={AuthRouter} exact>
                    </PublicRoute>
                    <PrivateRoute isAuthenticated={isLoggedIn} path="/" component={JournalScreen}>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>

    )
}
