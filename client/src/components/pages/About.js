import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar'
import MediaIcons from '../layout/MediaIcons'

const About = () => {
    const authContext = useContext(AuthContext)
    useEffect(() => {
      authContext.loadUser()
      // eslint-disable-next-line
    }, [])

    return (
        <div className="panel about">
            <Sidebar />
            <div className="section left">
                <div className="header">
                    <span className="title lw-cs">elisabeth foster</span>
                </div>
                <div className="body">
                    <span className="title">about</span>
                    <span className="subtitle">
                      Raw, honest, blunt, vulgar and superfluous,
                      <span className="book-title"> Raspberry Colored Scars </span>
                      will take you through a journey of pain, discovery,
                      loss and the absolute recovery that may help guide
                      you and family members through a traumatic experience.
                    </span>
                </div>
                <div className="footer">
                    <MediaIcons />
                </div>
            </div>
            <div className="section right">
                <div className="mySlides fade">
                    <img src="/img/slideshow/back1.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default About
