import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import EventContext from '../../context/event/eventContext'
import {
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardActions,
    Paper,
    IconButton,
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import RefreshIcon from '@material-ui/icons/Refresh'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import EventRoundedIcon from '@material-ui/icons/Event'
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded'
import MailRoundedIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import MediaIcons from './MediaIcons'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const Sidebar = () => {
    const authContext = useContext(AuthContext)
    const eventContext = useContext(EventContext)
    const {isAuthenticated, isAdmin, logout, user} = authContext
    const {events, filtered, getEvents, loading, error, setError} = eventContext

    // useEffect(() => {
    //     getEvents()
    //     // eslint-disable-next-line
    // }, [])

    const [state, setState] = useState({
        showSidebar: false,
    })

    const handleRefresh = () => {
        getEvents()
    }
    // const handleRefresh = async () => {
    //     setEventState({...eventState, refreshing: true})
    //     try {
    //         const res = await axios.get(`/api/events${eventState.limit > 0 ? '?_limit=' + eventState.limit : ''}`)
    //         setEventState({...eventState, events: res.data, refreshing: false})
    //     } catch (err) {
    //         return setEventState({...eventState, error: 'Error! There are no events.', refreshing: false})
    //     }
    // }


    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
            return
        if (event && event.type === 'click' && (event.target.classList.contains('ignore') || event.target.className.toString().includes('ignore')))
            return
        setState({...state, showSidebar: open})
    }

    const onLogout = () => {
        logout()
    }

    const headerSection = (
        <div className="section header">
            <div className="logo">
                <img src={'/img/book3.jpg'} alt="Raspberry Colored Scars" className="img" />
            </div>
            <div className="banner">elisabeth foster</div>
        </div>
    )

    const authenticatedLinks = (
        <div className="section profile">
            <div className="title">{user && user.name}</div>
            <List className="list">
                <Link to="/" className="link">
                    <ListItem button>
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Home" className="text" />
                    </ListItem>
                </Link>
            </List>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" /><span className="hide-sm">Logout</span>
                </a>
            </li>
        </div>
    )


    const pageLinks = (
        <div className="section links">
            <Paper className="title" elevation={5}>
                Pages
                <IconButton classes={{root: 'ignore'}}>
                    <LinkIcon className="ignore" />
                </IconButton>
            </Paper>
            <List className="list">
                <Link to="/" className="link">
                    <ListItem button>
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Home" className="text" />
                    </ListItem>
                </Link>
                <Link to="/about" className="link">
                    <ListItem button>
                        <ListItemIcon><InfoRoundedIcon /></ListItemIcon>
                        <ListItemText primary="About" className="text" />
                    </ListItem>
                </Link>
                <Link to="/events" className="link">
                    <ListItem button>
                        <ListItemIcon><EventRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Events" className="text" />
                    </ListItem>
                </Link>
                <Link to="/blog" className="link">
                    <ListItem button>
                        <ListItemIcon><TextsmsRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Blog" className="text" />
                    </ListItem>
                </Link>
                <Link to="/contact" className="link">
                    <ListItem button>
                        <ListItemIcon><MailRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Contact" className="text" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )

    const Event = props => {
        const {name, description, location, link} = props.event
        return (
            <ListItem>
                <div className="event">
                    <Card className="card">
                        <CardActionArea>
                            {/*<CardMedia*/}
                            {/*    component="img"*/}
                            {/*    alt="Book launch"*/}
                            {/*    image="/img/book2.jpg"*/}
                            {/*    title="Book launch"*/}
                            {/*/>*/}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                                <Typography variant="body1">{location}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {description}
                                    {/*Raspberry Colored Scars is now available for purchase on Amazon.com!*/}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="row center">
                            <Button
                                size="large"
                                href={link}
                                target="_blank"
                                className="button"
                            >
                                Buy now
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </ListItem>
        )
    }

    const eventSection = (
        <div className="section event">
            <Paper className="title" elevation={5}>Events
                <IconButton classes={{root: 'ignore'}} onClick={handleRefresh}>
                    <RefreshIcon className={'ignore ' + (loading ? 'loading' : '')} classes={{root: loading && 'loading'}}/>
                </IconButton>
            </Paper>
            {/*<ButtonGroup className="switcher" aria-label="small outlined button group">*/}
            {/*    <Button classes={{label: 'ignore'}} value={'recent'} onClick={handleRefresh}>Sort</Button>*/}
            {/*</ButtonGroup>*/}
            {events !== null && !loading
                ? events.map((event) =>
                    <Event key={event.name} event={event} />,
                ) : error
            }
        </div>
    )

    const isAuthenticatedAdminLinks = (
        <div className="section">
            <div className="title"></div>
            <List className="list">
                <Link to="/admin" className="link">
                    <ListItem button>
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Admin Dashboard" className="text" />
                    </ListItem>
                </Link>
                <Link to="/admin/events" className="link">
                    <ListItem button>
                        <ListItemIcon><EventRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Events" className="text" />
                    </ListItem>
                </Link>
                <Link to="/blog" className="link">
                    <ListItem button>
                        <ListItemIcon><TextsmsRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Blog" className="text" />
                    </ListItem>
                </Link>
                <Link to="/contact" className="link">
                    <ListItem button>
                        <ListItemIcon><MailRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Contact" className="text" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )

    return (
        <div className="sidebar-component">
            <Button className="sidebar-toggle" onClick={toggleDrawer(true)}>
                <MenuIcon className="sidebar-icon" />
            </Button>
            <SwipeableDrawer
                open={state.showSidebar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                className="sidebar"
            >
                <div
                    className="column"
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {/*{isAuthenticated ? headerSection : ''}*/}
                    {headerSection}
                    <List className="body mini-scrollbar round-scrollbar">
                        <Divider />
                        {pageLinks}
                        <Divider />
                        {isAuthenticated ? authenticatedLinks(<Divider />) : ''}
                        {isAdmin ? isAuthenticatedAdminLinks(<Divider />) : ''}
                        {eventSection}
                        <Divider />
                    </List>
                    <div className="section footer">
                        <MediaIcons />
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    )
}

export default Sidebar
