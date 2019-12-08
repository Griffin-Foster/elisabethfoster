$(document).ready(function() {
    let carouselEl = $('#carousel')
    let size = $('.carouselItem').length
    let index = 0
    let left = 0
    let leftProperty = left + '%'

    setInterval(() => {
        if (index === size - 1) {
            index = 0
            left = 0
            return $(carouselEl).css({'left': leftProperty})
        }

        index += 1
        left -= 100
        $(carouselEl).css({'left': leftProperty})
    }, 5000)
})
