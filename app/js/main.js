$(function () {
    $('.product-slider__items').slick({
        dots: true,
        arrows: false,
        centerPadding: 0,
        /*autoplay: true,
        autoplaySpeed: 5000,*/
    })

    $('.partners__items').slick({
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 801,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
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
        $('.header__menu').toggleClass('menu--active');
        $('.body').toggleClass('body-stop-scroll');
    });

    $(window).scroll(function () {
        var fixed = $('.header__inner');
        var slider = $('.product-slider')
        scroll = $(window).scrollTop();
        if (scroll >= 70) {
            fixed.addClass('header__inner--scroll')
            slider.addClass('product-slider--scroll')
        } else {
            fixed.removeClass('header__inner--scroll')
            slider.removeClass('product-slider--scroll')
        }
    })
});