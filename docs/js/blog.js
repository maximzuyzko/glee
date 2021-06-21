$(function () {
    const asideTitle = document.querySelectorAll('.aside-filters__title');
    asideTitle.forEach(item => {
        item.addEventListener('click', () => {
            item.nextElementSibling.classList.toggle('aside-filters__form--hidden');
        })
    })

    $('.button-filters, .blog-list__overlay').on('click', function () {
        $('.blog-list__overlay').toggleClass('blog-list__overlay--active');
        $('.aside-filters').toggleClass('aside-filters__active');
        $('.body').toggleClass('body-stop-scroll');
    });
});