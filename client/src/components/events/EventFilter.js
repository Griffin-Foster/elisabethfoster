import React, {useContext, useState} from 'react'
import EventContext from '../../context/event/eventContext'
import {TextField} from '@material-ui/core'

const EventFilter = () => {
    const eventContext = useContext(EventContext)
    const {filterEvents, clearFilter} = eventContext

    const [text, setText] = useState('')

    const onChange = e => {
        const textValue = e.target.value
        setText(textValue)
        if (textValue !== '')
            filterEvents(textValue.toLowerCase())
        else
            clearFilter()
    }

    const onSubmit = e => e.preventDefault()

    return (
        <div className="section header">
            {/*<div className="title"><h2>Events</h2></div>*/}
            <div className="filter">
                <form onSubmit={onSubmit}>
                    <TextField
                        value={text}
                        type="text"
                        placeholder="Search..."
                        variant="outlined"
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default EventFilter
