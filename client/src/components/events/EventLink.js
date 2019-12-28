import React from 'react'
import PropTypes from 'prop-types'
import {IconButton} from '@material-ui/core'
import {Share, ShoppingCart, Info} from '@material-ui/icons'

const EventLink = ({link}) => {
    const {name, url} = link

    const Icon = (name) => {
        switch (name) {
            case 'buy':
                return <ShoppingCart />
            case 'share':
                return <Share />
            case 'readMore':
                return <Info />
        }
    }

    if (url !== '')
        return <IconButton aria-label={name}>{Icon}</IconButton>

    return (
        <a href={url} rel="_blank" res="noreferrer noopener">
            <IconButton aria-label={name}>
                {Icon}
            </IconButton>
        </a>
    )
}

EventLink.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

export default EventLink