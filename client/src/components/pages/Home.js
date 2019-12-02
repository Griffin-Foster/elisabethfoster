import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import '../../App.scss'
import NavigationLinks from '../layout/NavigationLinks'
import NavigationButtons from '../layout/NavigationButtons'
import Icons from '../img/Icons'

const Home = () => {
  // const authContext = useContext(AuthContext)

  // useEffect(() => {
  //   authContext.loadUser()
  //   // eslint-disable-next-line
  // }, [])

  return (
      <div className="panel home">
        <div className="section left mini-scrollbar rounded-scrollbar">
          <div className="view-toggle praise" data-dialog="praise"></div>
          <div className="header">
            <span className="title lw-cs">elisabeth foster</span>
          </div>
          <div className="body">
            <span className="title">raspberry colored scars</span>
            <span className="subtitle">
              Raw, honest, blunt, vulgar and superfluous,
              <span className="book-title"> Raspberry Colored Scars </span>
              will take you through a journey of pain, discovery,
              loss and the absolute recovery that may help guide
              you and family members through a traumatic experience.
            </span>
          </div>
          <div className="links">
            <div className="section general">
              <NavigationLinks />
            </div>
            <div className="section buttons">
              <NavigationButtons />
            </div>
          </div>
          <div className="footer">
            <div className="icons">
              <a href="https://www.facebook.com/raspberrycoloredscars" className="icon" target="_blank" rel="noopener noreferrer">
                <Icons icon="facebook" />
              </a>
              <a href="https://www.instagram.com/raspberrycoloredscars" className="icon" target="_blank" rel="noopener noreferrer">
                <Icons icon="instagram" />
              </a>
              <a href="mailto:info.rcoloredscars@gmail.com" className="icon" target="_blank" rel="noopener noreferrer">
                <Icons icon="mail" />
              </a>
            </div>
          </div>
        </div>
        <div className="section right">
            <div className="mySlides fade">
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" />
            </div>
        </div>
        <div className="section praise">

        </div>
      </div>
  )
}

export default Home
