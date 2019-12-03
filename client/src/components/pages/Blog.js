import React, {useContext, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import AuthContext from '../../context/auth/authContext'

const Blog = () => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container className="panel blog">
        </Grid>
    )
}

export default Blog
