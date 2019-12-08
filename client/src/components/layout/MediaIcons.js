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
            <a href="https://www.amazon.com/Elisabeth-Foster/e/B0829CFKBV?ref_=dbs_p_ebk_r00_abau_000000"
               className="icon"
               target="_blank"
               rel="noopener noreferrer">
                <Icons icon="instagram" />
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