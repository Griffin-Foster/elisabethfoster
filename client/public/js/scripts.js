$(document).ready(function() {
    const carouselEl = $('#carousel')
    const size = $('.carouselItem').length - 1
    let index = 0
    let left = 0

    if (size > 1)
        setInterval(() => {
            if (index === size - 1) {
                index = 0
                left = 0
                return $(carouselEl).css('left', `${left}vw`)
            }

            index += 1
            left = left - 100
            $(carouselEl).css('left', `${left}vw`)
        }, 7500)
})

// const carouselEl = document.getElementsByClassName('carousel')
// const size = document.getElementsByClassName('carouselItem').length - 1
// let index = 0
// let left = 0
// let leftProperty = `${left}%`
//
// setInterval(() => {
//     if (index === size) {
//         index = 0
//         left = 0
//         return carouselEl.style.left = leftProperty
//     }
//
//     index += 1
//     left = left - 100
//     carouselEl.style.left = `${left}%`
// }, 5000)


