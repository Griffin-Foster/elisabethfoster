import {
    SET_CONTACT_FORM_FIELDS,
    CONTACT_FORM_SUCCESS,
    CONTACT_FORM_FAIL,
    CLEAR_CONTACT_FORM_FIELDS,
    CLEAR_CONTACT_FORM_ALERTS,
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case SET_CONTACT_FORM_FIELDS:
            return {
                ...state,
                contactFormData: [action.payload],
            }
        case CLEAR_CONTACT_FORM_FIELDS:
            return {
                ...state,
                contactFormData: null,
            }
        case CONTACT_FORM_FAIL:
            return {
                ...state,
                error: action.payload,
                success: '',
            }
        case CONTACT_FORM_SUCCESS:
            return {
                ...state,
                error: '',
                success: 'Success! Your contact form was successfully submitted.',
            }
        case CLEAR_CONTACT_FORM_ALERTS:
            return {
                ...state,
                error: '',
                success: '',
            }
        default:
            return state
    }
}
