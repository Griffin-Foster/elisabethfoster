import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'

const Logout = (props) => {
    const authContext = useContext(AuthContext)
    const {logout, loadUser, error, isAuthenticated} = authContext

    useEffect(() => {
        logout()
        loadUser()
        if (!isAuthenticated)
            props.history.push('/')
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    return (
        <div />
    )
}

export default Logout
