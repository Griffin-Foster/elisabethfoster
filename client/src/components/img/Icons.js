import React from 'react'

import Facebook from './Facebook'
import Mail from './Mail'
import Instagram from './Instagram'

const Icons = (props) => {
	switch (props.icon) {
		case "facebook":
			return <Facebook />
		case "mail":
			return <Mail />
		case "instagram":
			return <Instagram />
		default:
			return ''
	}
}

export default Icons
