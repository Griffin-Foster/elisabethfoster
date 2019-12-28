import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                loading: false,
                isAuth: true,
                user: action.payload,
                privileges: action.payload.privileges,
                errors: null,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                loading: false,
                errors: null,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                loading: false,
                isAuth: false,
                user: null,
                privileges: {
                    member: false,
                    events: true,
                    eventsAdmin: false,
                    blog: true,
                    admin: false,
                },
                errors: {
                    auth: action.payload,
                },
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                loading: false,
                isAuth: false,
                user: null,
                privileges: {
                    member: false,
                    events: true,
                    eventsAdmin: false,
                    blog: true,
                    admin: false,
                },
                errors: null,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            }
        default:
            return {
                ...state,
                errors: null,
            }
    }
}
