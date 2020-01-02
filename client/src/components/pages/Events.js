import React from 'react'
import EventFilter from '../events/EventFilter'
import Events from '../events/Events'
import Sidebar from '../layout/Sidebar/Sidebar'

const EventsPage = () => {

    return (
        <div className="panel events">
            <Sidebar />
            <EventFilter />
            <Events />
        </div>
    )
}

export default EventsPage
