import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import EventContext from '../../context/event/eventContext'
import EventItem from './EventItem'
import Spinner from '../layout/Spinner'

const Events = () => {
    const authContext = useContext(AuthContext)
    const isAdmin = authContext.privileges.admin
    const eventContext = useContext(EventContext)
    const {events, filtered, getEvents, loading} = eventContext

    const desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    // const events = [
    //     {
    //         _id: 123,
    //         name: 'Event 1',
    //         description: desc,
    //         startDate: new Date(),
    //         location: 'Event location...',
    //         imageURL: 'https://images.unsplash.com/photo-1576828311972-b630593a2560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    //     },
    //     {
    //         _id: 1234,
    //         name: 'Event 2',
    //         description: desc,
    //         startDate: new Date(),
    //         location: 'Event location...',
    //         imageURL: 'https://images.unsplash.com/photo-1576828311972-b630593a2560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    //     },
    //     {
    //         _id: 1235,
    //         name: 'Event 3',
    //         description: desc,
    //         startDate: new Date(),
    //         location: 'Event location...',
    //         imageURL: 'https://images.unsplash.com/photo-1576828311972-b630593a2560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    //     },
    //     {
    //         _id: 1236,
    //         name: 'Event 4',
    //         description: desc,
    //         startDate: new Date(),
    //         location: 'Event location...',
    //         imageURL: 'https://images.unsplash.com/photo-1576828311972-b630593a2560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    //     },
    //     {
    //         _id: 1237,
    //         name: 'Event 5',
    //         description: desc,
    //         startDate: new Date(),
    //         location: 'Event location...',
    //         imageURL: 'https://images.unsplash.com/photo-1576828311972-b630593a2560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    //     },
    // ]

    useEffect(() => {
        getEvents()
        // eslint-disable-next-line
    }, [])

    if (!events.length > 0 && !loading) {
        return (
            <div className="section body">
                <div className="pane events">
                    <h2>There are no events.</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="section body">
            <div className="pane events">
                {events.length > 0 && !loading ? (
                    filtered
                        ? (
                            filtered.length > 0 ? filtered.map(event => <EventItem event={event} key={event.name} isAdmin={isAdmin} classNames="item" />)
                                : (<h2>No events match your search.</h2>)
                        ) : (
                            events.map(event => <EventItem event={event} key={event.name} isAdmin={isAdmin} classNames="item" />)
                        )
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}

export default Events
