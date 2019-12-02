import React, { useContext, useEffect } from 'react'
import Sidebar from '../layout/Sidebar'
// import AuthContext from '../../context/auth/authContext'
import TextField from '@material-ui/core/TextField'

const Contact = () => {
  // const authContext = useContext(AuthContext)

  // useEffect(() => {
  //   authContext.loadUser()
  //   // eslint-disable-next-line
  // }, [])

  return (
    <div className="panel contact">
      <Sidebar />
      <form className="contact">
        <TextField
            id="outlined-password-input"
            label="First name"
            type="text"
            autoComplete="current-first-name"
            variant="outlined"
        />
      </form>
    </div>
  )
}

export default Contact
