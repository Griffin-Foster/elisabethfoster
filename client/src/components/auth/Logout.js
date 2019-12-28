import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'

const Logout = (props) => {
    const authContext = useContext(AuthContext)
    const {logout, loadUser, errors, isAuth} = authContext

    useEffect(() => {
        logout()
        loadUser()
        if (!isAuth)
            props.history.push('/')
        // eslint-disable-next-line
    }, [errors, isAuth, props.history])

    return (
        <div />
    )
}

export default Logout
