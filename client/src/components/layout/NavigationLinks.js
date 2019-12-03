import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const NavigationLinks = props => {
    return (
        <Fragment>
            <Link to="/" className="link">Home</Link>
            <Link to="/about" className="link closed">About</Link>
            <Link to="/events" className="link closed">Events</Link>
            {/*<Link to="/blog" className="link closed">Blog</Link>*/}
            <Link to="/contact" className="link">Contact</Link>
            {/*<Link to="/expierence" className="link">Experience</Link>*/}
        </Fragment>
    )
}

export default NavigationLinks
