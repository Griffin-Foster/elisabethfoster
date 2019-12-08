import React, {useContext, useEffect, useState} from 'react'
import Sidebar from '../layout/Sidebar'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Send} from '@material-ui/icons'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CloseIcon from '@material-ui/icons/Close'

const Contact = () => {
    const authContext = useContext(AuthContext)
    const {loadUser, isAuthenticated, user} = authContext
    const contactContext = useContext(ContactContext)
    const {submitContactForm, clearFormFields, dismissAlerts, contactFormData, error, success} = contactContext

    useEffect(() => {
        loadUser()
        if (contactFormData !== null) {
            setFormData(contactFormData)
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: '',
                owner: isAuthenticated ? user.id : null,
            })
        }
    }, [contactContext, contactFormData])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        owner: isAuthenticated ? user.id : null,
    })
    const {firstName, lastName, email, subject, message} = formData

    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        submitContactForm(formData)
        clearFormFields()
        setTimeout(() => {
            dismissAlerts()
        }, 5000) // Dismiss alerts after 5 seconds
    }

    const clearAlerts = () => {
        dismissAlerts()
    }

    return (
        <div className="panel contact">
            <Sidebar />
            <form className="contact" onSubmit={onSubmit}>
                <div className="header">
                    <div className="background"></div>
                    <span className="title">Contact</span>
                </div>
                {error !== '' ?
                    <div className="row alert error">
                        <ErrorOutlineIcon className="icon" />
                        <div className="message">{error}</div>
                        <div className="close" onClick={clearAlerts}>
                            <CloseIcon />
                        </div>
                    </div>
                    : ''
                }
                {success !== '' ?
                    <div className="row alert success">
                        <CheckCircleOutlineIcon className="icon" />
                        <div className="message">{success}</div>
                        <div className="close" onClick={clearAlerts}>
                            <CloseIcon />
                        </div>
                    </div>
                    : ''
                }
                <div className="row">
                    <TextField
                        className="formField"
                        label="First name"
                        type="text"
                        autoComplete="current-first-name"
                        variant="outlined"
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                        required
                    />
                    <TextField
                        className="formField"
                        label="Last name"
                        type="text"
                        autoComplete="current-first-name"
                        variant="outlined"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <TextField
                        className="formField"
                        label="Email address"
                        type="text"
                        autoComplete="current-email"
                        variant="outlined"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <TextField
                        className="formField"
                        label="Subject"
                        type="text"
                        variant="outlined"
                        name="subject"
                        value={subject}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <TextField
                        className="formField mini-scrollbar round-scrollbar"
                        label="Message"
                        type="text"
                        variant="outlined"
                        name="message"
                        multiline
                        rows="8"
                        rowsMax="8"
                        value={message}
                        inputProps={{
                            className: 'mini-scrollbar round-scrollbar',
                        }}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <Button
                        variant="contained"
                        // color="primary"
                        className="formSubmit"
                        endIcon={<Send />}
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Contact
