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
                isAuthenticated: true,
                isAdmin: action.payload.isAdmin,
                loading: false,
                user: action.payload,
                error: null,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isAdmin: false,
                loading: false,
                error: null,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAdmin: false,
                loading: false,
                user: null,
                error: action.payload.msg,
            }
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAdmin: false,
                loading: false,
                user: null,
                error: null,
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAdmin: false,
                loading: false,
                user: null,
                error: null,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return {
                ...state,
                error: null,
            }
    }
}
