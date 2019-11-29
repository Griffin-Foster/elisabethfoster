import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const NavigationLinks = (props) => {
  return (
    <Fragment>
      <Link to="/" className="link">Home</Link>
      <Link to="/about" className="link">About</Link>
      <Link to="/events" className="link">Events</Link>
      <Link to="/contact" className="link">Contact</Link>
      {/*<Link to="/expierence" className="link">Experience</Link>*/}
    </Fragment>
  )
}

export default NavigationLinks
