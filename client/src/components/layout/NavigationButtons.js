import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const NavigationButtons = (props) => {
    // TODO: useContext() for ContentContext

    return (
        <Fragment>
            <a href="https://www.amazon.com/Elisabeth-Foster/e/B0829CFKBV?ref=sr_ntt_srch_lnk_1&qid=1575939848&sr=8-1"
               target="_blank"
               rel="noopener noreferrer"
               className="link button">BUY!</a>
            <Link className="link button thrive" to="/THRIVE">#THRIVE</Link>
        </Fragment>
    )
}

export default NavigationButtons
