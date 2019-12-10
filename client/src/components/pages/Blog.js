import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar/Sidebar'

const Blog = () => {
    const authContext = useContext(AuthContext)
    const {loadUser} = authContext
    // , isAuthenticated, isAdmin, user

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="panel blog">
            <Sidebar />
        </div>
    )
}

export default Blog
