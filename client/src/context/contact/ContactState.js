import React, {useReducer} from 'react'
import axios from 'axios'
import ContactFormContext from './contactContext'
import contactReducer from './contactReducer'

import {
    SET_CONTACT_FORM_FIELDS,
    CONTACT_FORM_SUCCESS,
    CONTACT_FORM_FAIL,
    CLEAR_CONTACT_FORM_FIELDS,
    CLEAR_CONTACT_FORM_ALERTS,
} from '../types'

const ContactState = (props) => {
    const initialState = {
        // firstName: '',
        // lastName: '',
        // email: '',
        // subject: '',
        // message: '',
        // owner: null,
        contactFormData: null,
        error: '',
        success: '',
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    const submitContactForm = async formData => {
        formData.name = formData.firstName + formData.lastName
        const config = {
            headers: {'Content-Type': 'application/json'},
        }
        try {
            const res = await axios.post('/api/submissions', formData, config)

            dispatch({
                type: CONTACT_FORM_SUCCESS,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: CONTACT_FORM_FAIL,
                payload: 'Error/Invalid: There was an error in submitting your form. Please try again!',
            })
        }
    }

    // Update Form State
    const setFormFields = formData => {
        dispatch({
            type: SET_CONTACT_FORM_FIELDS,
            payload: formData,
        })
    }

    // Clear Contact Form
    const clearFormFields = () => {
        dispatch({type: CLEAR_CONTACT_FORM_FIELDS})
    }

    // Set Error
    const setError = (error) => {
        dispatch({
            type: CONTACT_FORM_FAIL,
            payload: error,
        })
    }

    const dismissAlerts = () => {
        dispatch({type: CLEAR_CONTACT_FORM_ALERTS})
    }

    return (
        <ContactFormContext.Provider
            value={{
                contactFormData: state.contactFormData,
                owner: state.owner,
                error: state.error,
                success: state.success,
                submitContactForm,
                setFormFields,
                clearFormFields,
                dismissAlerts,
                setError,
            }}
        >
            {props.children}
        </ContactFormContext.Provider>
    )
}

export default ContactState
