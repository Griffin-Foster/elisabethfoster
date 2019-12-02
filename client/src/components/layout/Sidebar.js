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

const Sidebar = () => {
    // const authContext = useContext(AuthContext)
    // const {isAuthenticated, isAdmin, logout, user} = authContext

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
            className="sidebar"
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <div className="header">elisabeth foster</div>
            <Divider />
            <List>
                <Link to='/' className="link">
                    <ListItem button>
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Home" className="text" />
                    </ListItem>
                </Link>
                <Link to='/about' className="link">
                    <ListItem button>
                        <ListItemIcon><InfoRoundedIcon /></ListItemIcon>
                        <ListItemText primary="About" className="text" />
                    </ListItem>
                </Link>
                <Link to='/events' className="link">
                    <ListItem button>
                        <ListItemIcon><EventRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Events" className="text" />
                    </ListItem>
                </Link>
                <Link to='/blog' className="link">
                    <ListItem button>
                        <ListItemIcon><TextsmsRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Blog" className="text" />
                    </ListItem>
                </Link>
                <Link to='/contact' className="link">
                    <ListItem button>
                        <ListItemIcon><MailRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Home" className="text" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            {/*<List>*/}
            {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
            {/*        <ListItem button key={text}>*/}
            {/*            <ListItemIcon>{index % 2 === 0 ? <EventIcon /> : <MailIcon />}</ListItemIcon>*/}
            {/*            <ListItemText primary={text} />*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}
        </div>
    )

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
