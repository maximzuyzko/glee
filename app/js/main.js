$(function () {
    $('.product-slider__items').slick({
        dots: true,
        arrows: false,
        /*autoplay: true,
        autoplaySpeed: 5000,*/
    })

    $('.partners__items').slick({
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    });

    let containerEl1 = document.querySelector('.products-week');
    let containerEl2 = document.querySelector('.design');
    let config = {
        controls: {
            scope: 'local',
        },
    };
    (() => mixitup(containerEl1, config))();
    (() => mixitup(containerEl2, config))();

    $('.header__button').on('click', function () {
        $(this).toggleClass('header__button--active');
        $('.menu--header').toggleClass('menu--active');
        $('.body').toggleClass('body-stop-scroll');
    });
});