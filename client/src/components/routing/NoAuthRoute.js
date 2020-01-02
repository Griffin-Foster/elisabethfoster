import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const NoAuthRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated} = authContext

    return (
        <Route {...rest} render={props => !isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )} />
    )
}

export default NoAuthRoute
