import React from 'react'
import '../../styles/App.scss'
// import NavigationLinks from '../layout/NavigationLinks'
import NavigationButtons from '../layout/NavigationButtons'
import MediaIcons from '../layout/MediaIcons'
import Carousel from '../layout/Carousel'
import Sidebar from '../layout/Sidebar/Sidebar'

const Home = () => {
    return (
        <div className="panel home">
            <Sidebar />
            <div className="section left">
                <div className="view-toggle praise" data-dialog="praise" />
                <div className="header">
                    <span className="title lw-cs">elisabeth foster</span>
                </div>
                <div className="body">
                    <span className="title">raspberry colored scars</span>
                    <div className="subtitle">
                      Raw, honest, blunt, vulgar and superfluous,
                      <span className="book-title"> Raspberry Colored Scars </span>
                      will take you through a journey of pain, discovery,
                      loss and the absolute recovery that may help guide
                      you and family members through a traumatic experience.
                    </div>
                </div>
                <div className="links">
                    {/*<div className="section general">*/}
                    {/*    <NavigationLinks />*/}
                    {/*</div>*/}
                    <div className="section buttons">
                        <NavigationButtons />
                    </div>
                </div>
                <div className="footer">
                    <MediaIcons />
                </div>
            </div>
            <div className="section right">
                <Carousel showAll />
            </div>
            <div className="section praise">
            </div>
        </div>
    )
}

export default Home
