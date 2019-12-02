import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const Contact = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="panel contact">

    </div>
  )
}

export default Contact
