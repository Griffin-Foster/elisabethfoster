import {
    GET_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    SET_CURRENT_EVENT,
    CLEAR_CURRENT_EVENT,
    UPDATE_EVENT,
    FILTER_EVENTS,
    CLEAR_FILTER_EVENT,
    EVENT_ERROR,
    CLEAR_EVENTS,
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false,
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events],
                loading: false,
            }
        case UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map(event =>
                    event._id === action.payload._id ? action.payload : event,
                ),
                loading: false,
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(
                    event => event._id !== action.payload,
                ),
                loading: false,
            }
        case CLEAR_EVENTS:
            return {
                ...state,
                events: [],
                filtered: null,
                error: null,
                current: null,
            }
        case SET_CURRENT_EVENT:
            return {
                ...state,
                current: action.payload,
            }
        case CLEAR_CURRENT_EVENT:
            return {
                ...state,
                current: null,
            }
        case FILTER_EVENTS:
            return {
                ...state,
                filtered: state.events.filter(event => {
                    // const regex = new RegExp(`${action.payload}`, 'gi')
                    // return event.name.match(regex) || event.description.match(regex)
                    return Object.values(event).toString().toLowerCase().includes(action.payload)
                }),
            }
        case CLEAR_FILTER_EVENT:
            return {
                ...state,
                filtered: null,
            }
        case EVENT_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
};
