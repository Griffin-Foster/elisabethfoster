import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar/Sidebar'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import {TextField, Button, InputAdornment, FormControl, InputLabel, IconButton, OutlinedInput, FormHelperText} from '@material-ui/core'
import {Send} from '@material-ui/icons'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Register = (props) => {
    const authContext = useContext(AuthContext)
    const {register, error, isAuthenticated} = authContext

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false,
        formError: '',
        passwordError: '',
        formSuccess: '',
    })
    const {firstName, lastName, email, password, password2, showPassword, showPassword2, formError, passwordError, formSuccess} = formData

    useEffect(() => {
        if (isAuthenticated)
            props.history.push('/')

        if (error !== null)
            setFormData({...formData, formError: error})
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    useEffect(() => {
        if (password !== '' && password2 !== '' && password !== password2)
            setFormData({...formData, passwordError: 'Error/Invalid: Your passwords must match!'})
        else
            setFormData({...formData, passwordError: '', passwordSuccess: 'Success! Your passwords match.'})
    }, [password, password2])

    const togglePassword = () => setFormData({...formData, showPassword: !showPassword})
    const togglePassword2 = () => setFormData({...formData, showPassword2: !showPassword2})

    const handleMouseDownPassword = e => e.preventDefault()

    // TODO: Finish Register.js page
    // TODO: Change /routes/auth.js to include firstName and lastName
    // TODO: Change authContext to have firstName and lastName

    const dismissAlerts = () => {
        setFormData({...formData, formError: '', passwordError: '', formSuccess: '', passwordSuccess: ''})
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (firstName === '' || lastName === '' || email === '' || password === '')
            return setFormData({...formData, formError: 'All fields must be provided!'})
        if (password !== password2)
            return setFormData({...formData, formError: 'Your passwords do not match!'})
        if (password.length < 6 || password2.length < 6)
            return setFormData({...formData, formError: 'Your password must be at least 6 characters long!'})

        register({firstName, lastName, email, password})
    }

    return (
        <div className="panel register form">
            <Sidebar />
            <form className="" onSubmit={onSubmit} autoComplete="on">
                <div className="header">
                    <div className="background" />
                    <span className="title">Register</span>
                </div>
                {formError !== '' ?
                    <div className="row alert error">
                        <ErrorOutlineIcon className="icon" />
                        <div className="message">{formError}</div>
                        <div className="close" onClick={dismissAlerts}>
                            <CloseIcon />
                        </div>
                    </div>
                    : ''
                }
                {formSuccess !== '' ?
                    <div className="row alert success">
                        <CheckCircleOutlineIcon className="icon" />
                        <div className="message">{formSuccess}</div>
                        <div className="close" onClick={dismissAlerts}>
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
                        type="email"
                        autoComplete="current-email"
                        variant="outlined"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <FormControl variant="outlined" className={"formField" + (passwordError ? ' error' : (password !== '' && password2 !== '' ? ' success' : ''))} required>
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={80}
                            value={password}
                        />
                        <FormHelperText id="outlined-password-helper-text">Password must be at least 6 characters</FormHelperText>
                    </FormControl>
                </div>
                <div className="row">
                    <FormControl variant="outlined" className={"formField" + (passwordError ? ' error' : (password !== '' && password2 !== '' ? ' success' : ''))} required>
                        <InputLabel htmlFor="outlined-adornment-password2">
                            {passwordError ? 'Passwords do not match' : (password !== '' && password2 !== '' ? 'Passwords match' : 'Verify password')}
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password2"
                            name="password2"
                            type={showPassword2 ? 'text' : 'password'}
                            onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword2}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={passwordError ? 188 : (password !== '' && password2 !== '' ? 140 : 125)}
                            value={password2}
                        />
                        <FormHelperText id="outlined-password2-helper-text">Confirm your password</FormHelperText>
                    </FormControl>
                </div>
                <div className="row redirect">
                    <Link to="/login">Already have an account? Click here to log in.</Link>
                </div>
                <div className="row">
                    <Button
                        variant="contained"
                        // color="primary"
                        className="formSubmit"
                        endIcon={<Send />}
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Register
