import React, {useReducer} from 'react'
import axios from 'axios'
import EventContext from './eventContext'
import eventReducer from './eventReducer'
import {
    GET_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    SET_CURRENT_EVENT,
    CLEAR_CURRENT_EVENT,
    UPDATE_EVENT,
    FILTER_EVENTS,
    CLEAR_EVENTS,
    CLEAR_FILTER_EVENT,
    EVENT_ERROR,
} from '../types'

const EventState = (props) => {
    const initialState = {
        events: [],
        current: null,
        filtered: null,
        error: null,
    }

    const [state, dispatch] = useReducer(eventReducer, initialState)

    // Get Events
    const getEvents = async () => {
        try {
            const res = await axios.get('/api/events')

            dispatch({
                type: GET_EVENTS,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: EVENT_ERROR,
                payload: 'No events found in the database.',
            })
        }
    }

    // Add Event
    const addEvent = async (event) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const res = await axios.post('/api/events', event, config)

            dispatch({
                type: ADD_EVENT,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: EVENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Delete Event
    const deleteEvent = async (id) => {
        try {
            await axios.delete(`/api/events/${id}`)

            dispatch({
                type: DELETE_EVENT,
                payload: id,
            })
        } catch (err) {
            dispatch({
                type: EVENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Update Event
    const updateEvent = async (event) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const res = await axios.put(
                `/api/events/${event._id}`,
                event,
                config,
            )

            dispatch({
                type: UPDATE_EVENT,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: EVENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Clear Events
    const clearEvents = () => {
        dispatch({type: CLEAR_EVENTS})
    }

    // Set Current Event
    const setCurrent = (event) => {
        dispatch({type: SET_CURRENT_EVENT, payload: event})
    }

    // Clear Current Event
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT_EVENT})
    }

    // Filter Events
    const filterEvents = (text) => {
        dispatch({type: FILTER_EVENTS, payload: text})
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER_EVENT})
    }

    // Set Error
    const setError = (error) => {
        dispatch({
            type: EVENT_ERROR,
            payload: error,
        })
    }

    return (
        <EventContext.Provider
            value={{
                events: state.events,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addEvent,
                deleteEvent,
                setCurrent,
                clearCurrent,
                updateEvent,
                filterEvents,
                clearFilter,
                getEvents,
                clearEvents,
                setError,
            }}
        >
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState
