import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const {setAlert} = alertContext
    const {login, clearErrors, error, isAuthenticated} = authContext

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }

        if (error === 'Invalid Credentials')
            setAlert(error, 'danger')
        clearErrors()
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const {email, password} = user

    const onChange = e =>
        setUser({...user, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (email === '' || password === '') {
            setAlert('Please fill all fields', 'danger')
        } else {
            login({
                email,
                password,
            })
        }
    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    })

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </form>
        </div>
    )
}

export default Login
