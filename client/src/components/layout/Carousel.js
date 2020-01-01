import React from 'react'

const Carousel = ({showOne, showAll, showMany, show}) => {
    const images = [
        {
            name: 'back1',
            src: '/img/slideshow/back1.jpg'
        },
        {
            name: 'back2',
            src: '/img/slideshow/back2.jpg'
        },
        {
            name: 'back4',
            src: '/img/slideshow/back4.jpg'
        },
    ]

    if (showOne) {
        return (
            <div id="carousel" className="carousel">
                {images.map(({name, src}) => {
                    return name === show && <img key={name} src={src} alt="" className="carouselItem" />
                })}
            </div>
        )
    }

    if (showAll) {
        return (
            <div id="carousel" className="carousel">
                {images.map(({name, src}) => <img key={name} src={src} alt="" className="carouselItem" />)}
            </div>
        )
    }
}

export default Carousel