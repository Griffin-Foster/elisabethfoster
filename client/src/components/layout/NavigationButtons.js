import React, { Fragment } from 'react'

const NavigationButtons = (props) => {
    // TODO: useContext() for ContentContext

  return (
    <Fragment>
      <a href="https://www.amazon.com/dp/B08288QCDT/ref" target="_blank" rel="noopener noreferrer" className="link button">BUY!</a>
    </Fragment>
  )
}

export default NavigationButtons
