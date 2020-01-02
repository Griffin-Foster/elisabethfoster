import React, {useContext, useState} from 'react'
import EventContext from '../../context/event/eventContext'
import {TextField} from '@material-ui/core'

const EventFilter = () => {
    const eventContext = useContext(EventContext)
    const {filterEvents, clearFilter} = eventContext

    const [text, setText] = useState('')
    const [showClose, setShowClose] = useState(false)

    const onChange = e => {
        const textValue = e.target.value
        setText(textValue)
        if (textValue !== '') {
            filterEvents(textValue.toLowerCase())
            setShowClose(true)
        }
        else {
            clearFilter()
            setShowClose(false)
        }
    }

    const onSubmit = e => e.preventDefault()

    const onClick = () =>  {
        setText('')
        clearFilter()
        setShowClose(false)
    }

    return (
        <div className="section header">
            <div className="title"><h2>Events</h2></div>
            <div className="filter">
                {/*<h4>Search: </h4>*/}
                <form onSubmit={onSubmit}>
                    <TextField
                        value={text}
                        type="text"
                        placeholder="Search events..."
                        variant="outlined"
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {showClose && (
                        <span className="close" onClick={onClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                        </span>
                    )}
                </form>
            </div>
        </div>
    )
}

export default EventFilter
