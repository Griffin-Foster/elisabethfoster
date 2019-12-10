import React from 'react'

import Facebook from './Facebook'
import Mail from './Mail'
import Instagram from './Instagram'
import Amazon from './Amazon'

const Icons = (props) => {
	switch (props.icon) {
		case "facebook":
			return <Facebook />
		case "mail":
			return <Mail />
		case "instagram":
			return <Instagram />
		case "amazon":
			return <Amazon />
		default:
			return ''
	}
}

export default Icons
