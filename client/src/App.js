import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Events from './components/pages/Events'
import Blog from './components/pages/Blog'
import Contact from './components/pages/Contact'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Alerts from './components/layout/Alerts'
import NoAuthRoute from './components/routing/NoAuthRoute'
import PrivateRoute from './components/routing/PrivateRoute'
import AdminRoute from './components/routing/AdminRoute'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import EventState from './context/event/EventState'
import ContactState from './context/contact/ContactState'
import setAuthToken from './utils/setAuthToken'
import './styles/App.scss'
import EventForm from './components/events/EventForm'

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
                                <NoAuthRoute exact path="/register" component={Register} />
                                <NoAuthRoute exact path="/login" component={Login} />
                                <PrivateRoute exact path="/logout" component={Logout} />
                                <Redirect exact path="/home" to="/" />
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/events" component={Events} />
                                <AdminRoute exact path="/blog" component={Blog} />
                                <AdminRoute exact path="/api/events" component={EventForm} />
                                <ContactState>
                                    <Route exact path="/contact" component={Contact} />
                                </ContactState>
                            </Switch>
                        </Fragment>
                    </Router>
                </EventState>
            </AlertState>
        </AuthState>
    )
}

export default App
