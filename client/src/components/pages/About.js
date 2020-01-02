import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar/Sidebar'
import MediaIcons from '../layout/MediaIcons'
import Carousel from '../layout/Carousel'

const About = () => {
    const authContext = useContext(AuthContext)
    const {loadUser} = authContext
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="panel about">
            <Sidebar />
            <div className="section left mini-scrollbar">
                <div className="header">
                    <span className="title lw-cs">elisabeth foster</span>
                </div>
                <div className="body">
                    <span className="title">about</span>
                    <span className="subtitle">
                        Elisabeth Foster double-majored in government and sociology at the University of Texas,
                        focusing the majority of her undergraduate studies around counterterrorism,
                        criminal justice and advocacy. She founded Lasting Empowerment for Teen Success (LETS),
                        an organization which is now a non-profit in the state of Texas with a mission to improve the experience of incarcerated youth in Austin.
                        Elisabeth has worked at Alexander Dubose Jefferson & Townsend, where she collaborated on a Texas capital punishment case,
                        as well as Lone Star Justice Alliance, where she researched and managed case files of juvenile lifers.
                        As an Archer Fellow, she worked in the office of Representative Sheila Jackson Lee in Washington D.C..<br/><br/>

                        Elisabeth started writing poetry as a way to express her feelings and experiences.
                        The Me Too movement and women speaking out against sexual assault and sexual violence liberated
                        her from her silence and made her feel confident that her message would be heard and respected.
                        She was compelled to write her book, Raspberry Colored Scars, as a part of her own healing process.
                        When Elisabeth is not writing poetry, she enjoys spending time outside and connecting with other creatives.
                    </span>
                </div>
                <div className="footer">
                    <MediaIcons />
                </div>
            </div>
            <div className="section right">
                <Carousel showOne show="back2" />
            </div>
        </div>
    )
}

export default About
