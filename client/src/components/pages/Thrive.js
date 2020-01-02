import React from 'react'
import Sidebar from '../layout/Sidebar/Sidebar'

const Thrive = () => {

    return (
        <div className="panel thrive">
            <Sidebar />
            <div className="section main">
                <h1># THRIVE</h1>
                <h2 className="title">Survivors deserve the opportunity to do more than just survive, they deserve to THRIVE.</h2>
                <p className="body">
                    I started this program because I wanted my book to reach more than just my immediate family and friends,
                    but those who have been through a similar experience - other Survivors.
                    THRIVE is a program that allows anyone to donate a copy of Raspberry Colored Scars to an anonymous Survivor.
                    These copies are available for purchase for $7.99, and I will sign and deliver them directly to Survivors.
                    I will host individual meetings as well as group workshops and events to talk with these
                    Survivors and talk about the journey to thriving.
                </p>
            </div>
        </div>
    )
}

export default Thrive
