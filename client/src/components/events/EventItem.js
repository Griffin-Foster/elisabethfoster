import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EventContext from '../../context/event/eventContext'

import {
    CardActions,
    IconButton,
} from '@material-ui/core'
import {Favorite, Share, MoreVert, Edit, Delete} from '@material-ui/icons'

const EventItem = ({event, isAdmin}) => {
    const eventContext = useContext(EventContext)
    const {deleteEvent, setCurrent, clearCurrent} = eventContext

    const {_id, name, description, startDate, finishDate, location, image, links, meta} = event

    const date = moment(startDate).format('MMM Do, YYYY @ h:mm a')
    let date2
    if (finishDate !== undefined)
        date2 = moment(finishDate).format('MMM Do, YYYY @ h:mm a')

    const onDelete = e => {
        e.preventDefault()
        deleteEvent(_id)
        clearCurrent()
    }

    const onEdit = () => setCurrent(event)

    const [expanded, setExpanded] = React.useState(false)
    const handleExpandClick = () => setExpanded(!expanded)

    return (
        <div className="event paper">
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
                        {/*<IconButton*/}
                        {/*    className={clsx(classes.expand, {*/}
                        {/*        [classes.expandOpen]: expanded,*/}
                        {/*    })}*/}
                        {/*    onClick={handleExpandClick}*/}
                        {/*    aria-expanded={expanded}*/}
                        {/*    aria-label="show more"*/}
                        {/*>*/}
                        {/*    <ExpandMore />*/}
                        {/*</IconButton>*/}
                    </CardActions>
                </div>
            </div>
            {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
            {/*    <CardContent>*/}
            {/*        <Typography paragraph>{description}</Typography>*/}
            {/*    </CardContent>*/}
            {/*</Collapse>*/}

        </div>
    )
}

EventItem.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventItem
