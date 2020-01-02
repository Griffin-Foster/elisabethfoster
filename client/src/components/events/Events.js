import React, {useContext, useEffect} from 'react'
import EventContext from '../../context/event/eventContext'
import EventItem from './EventItem'
import Spinner from '../layout/Spinner'

const Events = () => {
    const eventContext = useContext(EventContext)
    const {events, filtered, getEvents, loading} = eventContext

    useEffect(() => {
        getEvents()
        // eslint-disable-next-line
    }, [])

    if (!events.length > 0 && !loading) {
        return (
            <div className="section body">
                <div className="pane events">
                    <div className="empty">
                        <h2>There are no events.</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="section body mini-scrollbar">
            <div className="pane events">
                {events.length > 0 && !loading ? (
                    filtered
                        ? (
                            filtered.length > 0 ? filtered.map(event => <EventItem event={event} key={event.name} classNames="item" />)
                                : (<div className="empty"><h2>No events match your search.</h2></div>)
                        ) : (
                            events.map(event => <EventItem event={event} key={event.name} classNames="item" />)
                        )
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}

export default Events
