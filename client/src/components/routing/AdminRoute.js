import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const AdminRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, isAdmin, loading} = authContext

    return (
        <Route {...rest} render={props => !isAdmin && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default AdminRoute
