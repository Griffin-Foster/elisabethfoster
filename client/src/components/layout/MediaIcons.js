import React from 'react'
import Icons from '../img/Icons'

const MediaIcons = () => {
    return (
        <div className="icons">
            <a href="https://www.facebook.com/raspberrycoloredscars"
               className="icon"
               target="_blank"
               rel="noopener noreferrer">
                <Icons icon="facebook" />
            </a>
            <a href="https://www.instagram.com/raspberrycoloredscars"
               className="icon"
               target="_blank"
               rel="noopener noreferrer">
                <Icons icon="instagram" />
            </a>
            <a href="https://amazon.com/author/elisabethfoster"
               className="icon"
               target="_blank"
               rel="noopener noreferrer">
                <Icons icon="amazon" />
            </a>
            <a href="mailto:info.raspberrycoloredscars@gmail.com"
               className="icon"
               target="_blank"
               rel="noopener noreferrer">
                <Icons icon="mail" />
            </a>
        </div>
    )
}

export default MediaIcons