import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EventContext from '../../context/event/eventContext'

import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
} from '@material-ui/core'
import {red} from '@material-ui/core/colors'
// import Button from '@material-ui/core/Button'
import {Favorite, Share, ExpandMore, MoreVert, Edit, Delete} from '@material-ui/icons'
import EventLink from './EventLink'

const EventItem = ({event, isAdmin}) => {
    const eventContext = useContext(EventContext)
    const {deleteEvent, setCurrent, clearCurrent} = eventContext

    const {_id, name, description, startDate, finishDate, location, imageURL, links, meta} = event

    const date = moment(startDate).format('MMM Do, YYYY @ h:mm a')
    const date2 = moment(finishDate).format('MMM Do, YYYY @ h:mm a')

    const onDelete = e => {
        e.preventDefault()
        deleteEvent(_id)
        clearCurrent()
    }

    const onEdit = () => setCurrent(event)

    const useStyles = makeStyles(theme => ({
        card: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }))
    const classes = useStyles()

    const [expanded, setExpanded] = React.useState(false)
    const handleExpandClick = () => setExpanded(!expanded)

    return (
        <div className="event card">
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            RCS
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert />
                        </IconButton>
                    }
                    title={name}
                    subheader={date + ' to ' + date2}
                />
                {imageURL !== null && (
                    <CardMedia
                        className={classes.media}
                        src={imageURL}
                        title={name}
                    />
                )}
                <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">{location}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                    {links.map((link) => {
                        return (
                            <EventLink link={link} />
                        )
                    })}
                    {isAdmin && (
                        <IconButton aria-label="edit" onClick={onEdit}>
                            <Edit />
                        </IconButton>
                    )}
                    {isAdmin && (
                        <IconButton aria-label="delete" onClick={onDelete}>
                            <Delete />
                        </IconButton>
                    )}
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {/*<Typography paragraph>Method:</Typography>*/}
                        {/*<Typography paragraph></Typography>*/}
                        {/*<Typography paragraph></Typography>*/}
                        {/*<Typography paragraph></Typography>*/}
                        {/*<Typography></Typography>*/}
                    </CardContent>
                </Collapse>
            </Card>

        </div>
    )
}

EventItem.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventItem
