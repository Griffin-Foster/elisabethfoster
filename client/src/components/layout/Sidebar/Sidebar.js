import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../../context/auth/authContext'
import EventContext from '../../../context/event/eventContext'
import {
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Card,
    // CardActionArea,
    CardContent,
    Typography,
    // CardActions,
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
import MediaIcons from '../MediaIcons'
import {ExitToApp, VpnKey, LockOpen} from '@material-ui/icons'

const Sidebar = () => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, isAdmin, logout, user} = authContext
    const eventContext = useContext(EventContext)
    const {events, getEvents, loading, error} = eventContext

    const [state, setState] = useState({
        showSidebar: false,
    })

    const handleRefresh = () => {
        getEvents()
    }

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
            return
        if (event && event.type === 'click' && (event.target.classList.contains('ignore') || event.target.className.toString().includes('ignore')))
            return
        if (event && event.type === 'touch' && (event.touchstart.classList.contains('ignore') || event.touchstart.className.toString().includes('ignore')))
            return
        setState({showSidebar: open})
    }

    const onLogout = () => {
        logout()
    }

    const headerSection = (
        <div className="section header">
            <div className="logo">
                <img src={'/img/book2.jpg'} alt="Raspberry Colored Scars" className="img" />
            </div>
            <div className="banner">{user ? user.firstName : 'MENU'}</div>
        </div>
    )

    const authenticatedLinks = (
        <div className="section profile">
            <div className="title">{user && user.firstName}</div>
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
            <div className="title paper">
                Pages
                <IconButton classes={{root: 'ignore'}}>
                    <LinkIcon className="ignore" />
                </IconButton>
            </div>
            <div className="list card">
                <Link to="/" className="link">
                    <ListItem button className="listItem">
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Home" className="text" />
                    </ListItem>
                </Link>
                <Link to="/about" className="link">
                    <ListItem button className="listItem">
                        <ListItemIcon><InfoRoundedIcon /></ListItemIcon>
                        <ListItemText primary="About" className="text" />
                    </ListItem>
                </Link>
                <Link to="/events" className="link">
                    <ListItem button className="listItem">
                        <ListItemIcon><EventRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Events" className="text" />
                    </ListItem>
                </Link>
                <Link to="/blog" className="link">
                    <ListItem button className="listItem">
                        <ListItemIcon><TextsmsRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Blog" className="text" />
                    </ListItem>
                </Link>
                <Link to="/contact" className="link">
                    <ListItem button className="listItem">
                        <ListItemIcon><MailRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Contact" className="text" />
                    </ListItem>
                </Link>
                {isAuthenticated && (
                    <Link to="/logout" className="link" onClick={onLogout}>
                        <ListItem button className="listItem">
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary="Logout" className="text" />
                        </ListItem>
                    </Link>
                )}
                {!isAuthenticated && (
                    <Link to="/register" className="link">
                        <ListItem button className="listItem">
                            <ListItemIcon><VpnKey /></ListItemIcon>
                            <ListItemText primary="Register" className="text" />
                        </ListItem>
                    </Link>
                )}
                {!isAuthenticated && (
                    <Link to="/login" className="link">
                        <ListItem button className="listItem">
                            <ListItemIcon><LockOpen /></ListItemIcon>
                            <ListItemText primary="Login" className="text" />
                        </ListItem>
                    </Link>
                )}
            </div>
        </div>
    )

    const Event = ({event: {name, description, link, linkText}}) => {
        return (
            <Card className="event card">
                {/*<CardActionArea>*/}
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    alt="Book launch"*/}
                {/*    image="/img/book2.jpg"*/}
                {/*    title="Book launch"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                    {/*<Typography variant="body1">{location}</Typography>*/}
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
                {/*</CardActionArea>*/}
                {link !== '' && <span className="divider"/>}
                {link !== '' ?
                    <Button component="a" className="link" href={link} target="_blank" rel="noopener noreferrer">
                        {linkText}
                    </Button>
                    : ''}
            </Card>
        )
    }

    const eventSection = (
        <div className="section event">
            <div className="title paper">Events
                <IconButton classes={{root: 'ignore'}} onClick={handleRefresh}>
                    <RefreshIcon className={'ignore ' + (loading ? 'loading' : '')}
                                 classes={{root: loading && 'loading'}} />
                </IconButton>
            </div>
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
            <div className="title paper">
                Admin
                <IconButton classes={{root: 'ignore'}}>
                    <LinkIcon className="ignore" />
                </IconButton>
            </div>
            <div className="list">
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
            </div>
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
                    <div className="body mini-scrollbar round-scrollbar">
                        <Divider />
                        {pageLinks}
                        <Divider />
                        {isAuthenticated ? authenticatedLinks && <Divider /> : ''}
                        {isAdmin ? isAuthenticatedAdminLinks && <Divider /> : ''}
                        {eventSection}
                        <Divider />
                    </div>
                    <div className="section footer">
                        <MediaIcons />
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    )
}

export default Sidebar