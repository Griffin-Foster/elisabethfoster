import React, {useState, useContext, useEffect} from 'react'
import EventContext from '../../context/event/eventContext'

const EventForm = () => {
    const eventContext = useContext(EventContext)

    const {addEvent, updateEvent, clearCurrent, current} = eventContext

    useEffect(() => {
        if (current !== null) {
            setEvent(current)
        } else {
            setEvent({
                name: '',
                email: '',
                phone: '',
                type: 'personal',
            })
        }
    }, [eventContext, current])

    const [event, setEvent] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    })

    const {name, email, phone, type} = event

    const onChange = e =>
        setEvent({...event, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (current === null) {
            addEvent(event)
        } else {
            updateEvent(event)
        }
        clearAll()
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? 'Edit Event' : 'Add Event'}
            </h2>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Event Type</h5>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === 'personal'}
                onChange={onChange}
            />{' '}
            Personal{' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
            />{' '}
            Professional
            <div>
                <input
                    type="submit"
                    value={current ? 'Update Event' : 'Add Event'}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current && (
                <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>
                        Clear
                    </button>
                </div>
            )}
        </form>
    )
}

export default EventForm
