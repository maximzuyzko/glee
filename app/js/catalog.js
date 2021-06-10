$(function () {
    $('.aside-price__input').ionRangeSlider({
        type: 'double',
        min: 0,
        max: 899,
        from: 100,
        to: 500,
        onStart: function (data) {
            $('.aside-price__from').text(`$`+data.from+`.00`);
            $('.aside-price__to').text(`$`+data.to+`.00`);
        },

        onChange: function (data) {
            $('.aside-price__from').text(`$`+data.from+`.00`);
            $('.aside-price__to').text(`$`+data.to+`.00`);
        },
    });

    $('.button-filters, .catalog__overlay').on('click', function () {
        $('.catalog__overlay').toggleClass('catalog__overlay__active');
        $('.aside-filters').toggleClass('aside-filters__active');
        $('.body').toggleClass('body-stop-scroll');
    });

    $('.button-list').on('click', function (){
        $('.catalog-cards').addClass('catalog-cards--list');
        $('.pagination__list').addClass('pagination__list--list');
    });

    $('.button-grid').on('click', function (){
        $('.catalog-cards').removeClass('catalog-cards--list');
        $('.pagination__list').removeClass('pagination__list--list');
    });

    const asideTitle = document.querySelectorAll('.aside-filters__title');
    asideTitle.forEach(item => {
        item.addEventListener('click', () => {
            item.nextElementSibling.classList.toggle('aside-filters__form--hidden');
        })
    })
});