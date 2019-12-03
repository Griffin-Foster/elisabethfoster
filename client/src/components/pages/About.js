import React, { useContext, useEffect } from 'react'
// import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar'

const About = () => {
  // const authContext = useContext(AuthContext)
  // useEffect(() => {
  //   authContext.loadUser()
  //   // eslint-disable-next-line
  // }, [])

  return (
    <div className="panel about">
      <Sidebar />
    </div>
  )
}

export default About
