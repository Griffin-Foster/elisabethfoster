import React from 'react'
// import React, {Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
// import AuthContext from '../../context/auth/authContext'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import EventRoundedIcon from '@material-ui/icons/Event'
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded'
import MailRoundedIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import MediaIcons from './MediaIcons'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

const Sidebar = () => {
    // const authContext = useContext(AuthContext)
    // const {isAuthenticated, isAdmin, logout, user} = authContext

    const [state, setState] = React.useState({
        showSidebar: false,
    })

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setState({...state, showSidebar: open})
    }

    // const onLogout = () => {
    //     logout()
    // }
    //
    // const authLinks = (
    //     <Fragment>
    //         <li>Hello {user && user.name}</li>
    //         <li>
    //             <a onClick={onLogout} href="#!">
    //                 <i className="fas fa-sign-out-alt" /><span className="hide-sm">Logout</span>
    //             </a>
    //         </li>
    //     </Fragment>
    // )
    //
    // const guestLinks = (
    //     <Fragment>
    //         <li>
    //             <Link to="/register">Register</Link>
    //         </li>
    //         <li>
    //             <Link to="/login">Login</Link>
    //         </li>
    //     </Fragment>
    // )

    return (
        <div className="sidebar-component">
            {/*{isAuthenticated ? authLinks : guestLinks}*/}
            <Button className="sidebar-toggle" onClick={toggleDrawer(true)}>
                <MenuIcon className="sidebar-icon" />
            </Button>
            <SwipeableDrawer
                open={state.showSidebar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                className="sidebar"
            >
                {/*{isAdmin ? admin links : don't show}*/}
                <div
                    className="column mini-scrollbar round-scrollbar"
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <div className="header">elisabeth foster</div>
                    <List className="list links">
                        <Divider light />
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
                        <Divider />
                        {/*<ListItem>*/}
                        {/*    <div className="upcoming-event">*/}
                        {/*        <Card className="card">*/}
                        {/*            <CardActionArea>*/}
                        {/*                <CardMedia*/}
                        {/*                    component="img"*/}
                        {/*                    alt="Alt text..."*/}
                        {/*                    image={'/img/book2.jpg'}*/}
                        {/*                    title="Event title"*/}
                        {/*                />*/}
                        {/*                 <CardContent>*/}
                        {/*                     <Typography gutterBottom variant="h5" component="h2">Event</Typography>*/}
                        {/*                     <Typography variant="body2" color="textSecondary" component="p">*/}
                        {/*                        Event description cut short...*/}
                        {/*                    </Typography>*/}
                        {/*                </CardContent>*/}
                        {/*            </CardActionArea>*/}
                        {/*            <CardActions>*/}
                        {/*                <Button size="small" color="primary">*/}
                        {/*                    Share*/}
                        {/*                </Button>*/}
                        {/*                <Button size="small" color="primary">*/}
                        {/*                    Learn More*/}
                        {/*                </Button>*/}
                        {/*            </CardActions>*/}
                        {/*        </Card>*/}
                        {/*    </div>*/}
                        {/*    <Divider />*/}
                        {/*</ListItem>*/}
                    </List>
                    <div className="footer">
                        <MediaIcons />
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    )
}

export default Sidebar
