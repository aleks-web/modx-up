/*
    desc: Универсальный скрипт раскрытия/скрытия списка. Реализовано для БЭМ блока blocks/_drop-listing.scss
*/
$(function () {

    // Функция, которая затемняет сайт
    function addBodyBackground(e) {
        $('body').addClass('blackout');
    }

    $('.drop-listing').each(function (e) {

        $(this).mousemove(function (e) {
            if (!$(this).hasClass('drop-listing--open')) {
                $(this).toggleClass('drop-listing--open');
            }
        });

        $(this).mouseleave(function (e) {
            $(this).toggleClass('drop-listing--open');
        });

    });


    // Для карточек с текстом
    $('.card-info').each(function (e) {
        $(this).click(function (e) {
            $(this).toggleClass('card-info--open');
        });
    });

    // Главное меню
    $('.nav__burger').click(function (e) {
        $('.mob-menu').css('transform', 'translateX(0)');
        $('.mob-menu').addClass('open');
    });

    $(window).click(function (e) {
        $('.mob-menu').hasClass('open') ? $('.mob-menu').removeClass('open') : console.log('Нет');
    });


    // Спойлеры
    $('.spoiler').each(function (e) {
        $(this).click(function (e) {
            $(this).toggleClass('spoiler--open');
        });
    });
});