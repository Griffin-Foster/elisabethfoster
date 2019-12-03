import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Sidebar from '../layout/Sidebar'
import AuthContext from '../../context/auth/authContext'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Send} from '@material-ui/icons'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CloseIcon from '@material-ui/icons/Close'

const Contact = () => {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    const {user} = authContext

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        owner: user !== null ? user.id : null,
        error: '',
        success: '',
    })

    const {firstName, lastName, email, subject, message, error, success} = formData

    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value})

    const dismissAlert = () =>
        setFormData({...formData, error: '', success: ''})

    const onSubmit = async e => {
        e.preventDefault()
        // Failure //
        if (firstName === '' || lastName === '' || email === '' || subject === '' || message === '')
            return setFormData({...formData, error: 'Error/Invalid: Please enter all fields in the form!'})

        // HTTP req config
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // Send req to API
        try {
            const res = await axios.post('/api/submissions', formData, config)

            // Success //
            setFormData({...formData, error: '', success: `Success! We have received your submission, and you will hear back from us soon!`})
        } catch (err) {
            // Failure //
            return setFormData({...formData, error: `Error/Invalid: Please enter all fields in the form!`})
        }

        setTimeout(() => {
            setFormData({
                ...formData,
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: '',
                error: '',
                success: '',
            })
        }, 5000) // 5 seconds (5000 milliseconds)
    }

    return (
        <div className="panel contact">
            <Sidebar />
            <form className="contact" onSubmit={onSubmit}>
                <div className="header">
                    <div className="background"></div>
                    <span className="title">Contact</span>
                </div>
                {
                    error !== '' ?
                        <div className="row alert error">
                            <div className="message">
                                <ErrorOutlineIcon className="icon" />
                                {error}
                            </div>
                            <div className="close" onClick={dismissAlert}>
                                <CloseIcon />
                            </div>
                        </div>
                    : success !== '' ?
                        <div className="row alert success">
                            <div className="message">
                                <CheckCircleOutlineIcon className="icon" />
                                {success}
                            </div>
                            <div className="close" onClick={dismissAlert}>
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
                    />
                </div>
                <div className="row">
                    <TextField
                        className="formField"
                        label="Message"
                        type="text"
                        variant="outlined"
                        name="message"
                        multiline
                        rows="6"
                        rowsMax="6"
                        value={message}

                        onChange={onChange}
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
