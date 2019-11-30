import {
    GET_CONTENT,
    ADD_CONTENT,
    DELETE_CONTENT,
    SET_CURRENT_CONTENT,
    CLEAR_CURRENT_CONTENT,
    UPDATE_CONTENT,
    FILTER_CONTENT,
    CLEAR_FILTER_CONTENT,
    CONTENT_ERROR,
    CLEAR_CONTENT,
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_CONTENT:
            return {
                ...state,
                content: action.payload,
                loading: false,
            }
        case ADD_CONTENT:
            return {
                ...state,
                content: [action.payload, ...state.content],
                loading: false,
            }
        case UPDATE_CONTENT:
            return {
                ...state,
                content: state.content.map(event =>
                    event._id === action.payload._id ? action.payload : event,
                ),
                loading: false,
            }
        case DELETE_CONTENT:
            return {
                ...state,
                content: state.content.filter(
                    event => event._id !== action.payload,
                ),
                loading: false,
            }
        case CLEAR_CONTENT:
            return {
                ...state,
                content: null,
                filtered: null,
                error: null,
                currentPage: null,
            }
        case SET_CURRENT_CONTENT:
            return {
                ...state,
                currentPage: action.payload,
            }
        case CLEAR_CURRENT_CONTENT:
            return {
                ...state,
                currentPage: null,
            }
        case FILTER_CONTENT:
            return {
                ...state,
                filtered: state.content.filter(event => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return event.name.match(regex) || event.description.match(regex)
                }),
            }
        case CLEAR_FILTER_CONTENT:
            return {
                ...state,
                filtered: null,
            }
        case CONTENT_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
};
