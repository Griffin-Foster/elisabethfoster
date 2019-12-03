import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Event from './components/pages/Event'
import Contact from './components/pages/Contact'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import PrivateRoute from './components/routing/PrivateRoute'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import EventState from './context/event/EventState'
import setAuthToken from './utils/setAuthToken'
import './App.scss'

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {

    return (
        <AuthState>
            <AlertState>
                <EventState>
                    <Router>
                        <Fragment>
                            <Alerts />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <PrivateRoute exact path="/about" component={About} />
                                <PrivateRoute exact path="/events" component={Event} />
                                <Route exact path="/contact" component={Contact} />
                                <Redirect exact path="/register" to="/" component={Register} />
                                <Redirect exact path="/login" to="/" component={Login} />
                                <Redirect exact path="/home" to="/" />
                            </Switch>
                        </Fragment>
                    </Router>
                </EventState>
            </AlertState>
        </AuthState>
    )
}

export default App
