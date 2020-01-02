import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
    CardActions,
    // IconButton,
} from '@material-ui/core'
// import {Favorite, Share} from '@material-ui/icons'

const EventItem = ({event}) => {
    const {name, description, startDate, finishDate, location, image} = event
    // links, meta, _id

    const date = moment(startDate).format('MMM Do, YYYY @ h:mm a')
    let date2
    if (finishDate !== undefined)
        date2 = moment(finishDate).format('MMM Do, YYYY @ h:mm a')

    return (
        <div className="event">
            <div className="body">
                <div className="image">
                    <img src={image} alt="" />
                </div>
                <div className="content">
                    <div className="text">
                        <div className="name"><h1>{name}</h1></div>
                        <div className="date"><h4>{date}{(date2 !== undefined && date2 !== date) ? ' to ' + date2 : ''}</h4></div>
                        <div className="location"><h5>{location}</h5></div>
                        <div className="description">{description}</div>
                    </div>
                    <CardActions className="buttons" disableSpacing>
                        {/*<IconButton aria-label="like">*/}
                        {/*    <Favorite />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton aria-label="share">*/}
                        {/*    <Share />*/}
                        {/*</IconButton>*/}
                        {/*{isAdmin && (*/}
                        {/*    <IconButton aria-label="edit" onClick={onEdit}>*/}
                        {/*        <Edit />*/}
                        {/*    </IconButton>*/}
                        {/*)}*/}
                        {/*{isAdmin && (*/}
                        {/*    <IconButton aria-label="delete" onClick={onDelete}>*/}
                        {/*        <Delete />*/}
                        {/*    </IconButton>*/}
                        {/*)}*/}
                    </CardActions>
                </div>
            </div>
        </div>
    )
}

EventItem.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventItem
