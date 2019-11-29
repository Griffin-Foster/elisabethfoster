import React, {useContext, useEffect} from 'react'
import EventFilter from '../events/EventFilter'
import Events from '../events/Events'
import Grid from '@material-ui/core/Grid'
import AuthContext from '../../context/auth/authContext'

const EventsPage = () => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container className="panel events">
            <EventFilter />
            <Events />
        </Grid>
    )
}

export default EventsPage
