import React, {Fragment, useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

const Sidebar = () => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, isAdmin, logout, user} = authContext

    const classes = useStyles()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setState({...state, [side]: open})
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['Home', 'About', 'Events', 'Contact'].map((text, index) => (
                    <Link to={`/${text}`}>
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const onLogout = () => {
        logout()
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" /><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="sidebar">
            {/*{isAuthenticated ? authLinks : guestLinks}*/}
            <Button className="sidebar-toggle" onClick={toggleDrawer('left', true)}>
                <MenuIcon className="sidebar-icon" />
            </Button>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
                {/*{isAdmin ? admin links : don't show}*/}
            </SwipeableDrawer>
        </div>
    )
}

export default Sidebar
