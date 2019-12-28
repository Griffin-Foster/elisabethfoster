import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import EventFilter from '../events/EventFilter'
import Events from '../events/Events'
import Sidebar from '../layout/Sidebar/Sidebar'

const EventsPage = () => {
    const authContext = useContext(AuthContext)
    const {loadUser, user} = authContext

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="panel events">
            <Sidebar />
            <EventFilter />
            <Events />
        </div>
    )
}

export default EventsPage
