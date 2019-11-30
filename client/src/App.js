import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Event from './components/pages/Event'
import Contact from './components/pages/Contact'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import Sidebar from './components/layout/Sidebar'
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
                        <div className="page">
                            {/*<Sidebar />*/}
                            <Alerts />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <PrivateRoute exact path="/about" component={About} />
                                <PrivateRoute exact path="/events" component={Event} />
                                <PrivateRoute exact path="/contact" component={Contact} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <Redirect exact path="/home" to="/" />
                            </Switch>
                        </div>
                    </Router>
                </EventState>
            </AlertState>
        </AuthState>
    )
}

export default App
