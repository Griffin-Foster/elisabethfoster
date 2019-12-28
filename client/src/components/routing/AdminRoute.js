import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const AdminRoute = (props) => {
    const {component: Component, ...rest} = props
    const authContext = useContext(AuthContext)
    const {privileges, loading} = authContext
    const isAdmin = privileges.admin

    return (
        <Route {...rest} render={props => !isAdmin && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default AdminRoute
