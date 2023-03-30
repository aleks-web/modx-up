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


    // Спойлеры
    $('.spoiler').each(function (e) {
        $(this).click(function (e) {
            $(this).toggleClass('spoiler--open');
            $(this).find('.spoiler__content').slideToggle(200).toggleClass('.spoiler__content--open');
        });
    });



    // Карточки отзывов
    $('.review-card').each(function (e) {
        $(this).click(function (e) {
            $(this).toggleClass('review-card--open');
            $(this).find('.review-card__content').toggleClass('spoiler__content--open');
        });
    });

    // Блоки видео
    $('.video-youtube').each(function (e) {
        $(this).click(function (e) {
            let videoId = $(this).data('video-id');
            let videoSrc = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
            e.preventDefault();

            $(this).addClass('video-youtube--play');
            $(this).find('.video-youtube__video').html('<iframe src="' + videoSrc + '" allow="autoplay" frameborder="0" allowfullscreen></iframe>');
        });
    });

});