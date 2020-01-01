$(document).ready(function() {
    const carouselEl = $('#carousel')
    const size = $(carouselEl).children().length - 1
    let index = 0
    let left = 0

    if (size > 0)
        setInterval(() => {
            if (index === size) {
                index = 0
                left = 0
                return $(carouselEl).css('left', `${left}%`)
            }

            index += 1
            left = left - 100
            $(carouselEl).css('left', `${left}%`)
        }, 7500)
})


