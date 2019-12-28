import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
// import AlertContext from '../../context/alert/alertContext'

import {Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Sidebar from '../layout/Sidebar/Sidebar'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CloseIcon from '@material-ui/icons/Close'
import {LockOpen} from '@material-ui/icons'

const Login = (props) => {
    const authContext = useContext(AuthContext)
    const {login, errors, isAuth, clearErrors} = authContext

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
        formError: '',
    })
    const {email, password, showPassword, formError} = formData

    useEffect(() => {
        if (isAuth)
            props.history.push('/')
        setFormData({...formData, formError: ''})
        clearErrors()
    }, [isAuth, props.history])

    useEffect(() => {
        if (errors !== null && errors.auth)
            setFormData({...formData, formError: errors.auth})
        // eslint-disable-next-line
    }, [errors])

    const togglePassword = () => setFormData({...formData, showPassword: !showPassword})
    const handleMouseDownPassword = e => e.preventDefault()

    const dismissAlerts = () => setFormData({...formData, formError: ''})

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (email === '')
            return setFormData({...formData, formError: 'Please provide an email address!'})
        if (password === '')
            return setFormData({...formData, formError: 'Please provide a password!'})

        login({
            email,
            password,
        })
    }

    return (
        <div className="panel login form">
            <Sidebar />
            <form className="" onSubmit={onSubmit} autoComplete="on">
                <div className="header">
                    <div className="background" />
                    <span className="title">Login</span>
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
                        autoFocus
                        required
                    />
                </div>
                <div className="row">
                    <FormControl variant="outlined" className="formField" required>
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
                            autoComplete="current-password"
                        />
                    </FormControl>
                </div>
                <div className="row redirect">
                    <Link to="/register">Don't have an account? Click here to register.</Link>
                </div>
                <div className="row">
                    <Button
                        variant="contained"
                        // color="primary"
                        className="formSubmit"
                        endIcon={<LockOpen />}
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
