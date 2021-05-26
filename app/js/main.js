$(function () {
    $('.product-slider__items').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    })

    /*var mixer = mixitup('.products-week__items');*/

    /*var mixerOne = mixitup('.products-week__items', {
        controls: {
            scope: 'local'
        }
    });

    var mixerTwo = mixitup('.design__items', {
        controls: {
            scope: 'local'
        }
    });*/

    let containerEl1 = document.querySelector('.products-week');
    let containerEl2 = document.querySelector('.design');
    let config = {
        controls: {
            scope: 'local',
        },
    };
    (() => mixitup(containerEl1, config))();
    (() => mixitup(containerEl2, config))();

});