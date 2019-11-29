import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const About = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
    </div>
  )
}

export default About
