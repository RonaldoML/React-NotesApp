import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { JournalScreen } from '../journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {
    return (

        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouter}>
                    </Route>
                    <Route exact path="/" component={JournalScreen}>
                    </Route>
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>

    )
}
