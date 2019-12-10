import React, {useContext, useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import AuthContext from '../../context/auth/authContext'
import EventContext from '../../context/event/eventContext'
import EventItem from './EventItem'
import Spinner from '../layout/Spinner'

const Events = () => {
    const authContext = useContext(AuthContext)
    const {isAdmin} = authContext
    const eventContext = useContext(EventContext)
    const {events, filtered, getEvents, loading, error} = eventContext


    useEffect(() => {
        getEvents()
        // eslint-disable-next-line
    }, [])

    if (events !== null && events.length === 0 && !loading) {
        return <h4>Please add an event</h4>
    }

    return (
        <div className="section events">
            {events !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(event => (
                            <CSSTransition key={event._id} timeout={500} classNames="item">
                                <EventItem event={event} />
                            </CSSTransition>
                        ))
                        : events.map(event => (
                            <CSSTransition key={event._id} timeout={500} classNames="item">
                                <EventItem event={event} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default Events
