import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EventContext from '../../context/event/eventContext'

import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {red} from '@material-ui/core/colors'
// import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const EventItem = ({event}) => {
    const eventContext = useContext(EventContext)
    const {deleteEvent, setCurrent, clearCurrent} = eventContext

    const {_id, name, description, startDate, finishDate, location, imageURL} = event

    const date = moment(startDate).format('MMM DDo, YYYY @ h:mm a')
    const date2 = moment(finishDate).format('MMM DDo, YYY @ h:mm a')

    const onDelete = () => {
        deleteEvent(_id)
        clearCurrent()
    }

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

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="event card">
            <p>
                <button
                    className="btn btn-dark btn-sm"
                    onClick={() => setCurrent(event)}
                >
                    Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </p>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            RCS
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
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
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
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
