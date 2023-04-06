/*
    desc: Универсальный скрипт раскрытия/скрытия списка. Реализовано для БЭМ блока blocks/_drop-listing.scss
*/
$(function () {

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
        if (!$(this).hasClass('video-youtube-nav')) {
            $(this).click(function (e) {
                let videoId = $(this).data('video-id');
                let videoSrc = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
                e.preventDefault();

                $(this).addClass('video-youtube--play');
                $(this).find('.video-youtube__video').html('<iframe src="' + videoSrc + '" allow="autoplay" frameborder="0" allowfullscreen></iframe>');
            });
        }
    });

    // Табы
    $('.drop-tabs').each(function (e) {
        let allItems = $(this).find('.drop-tabs-list').find('.drop-tabs-list__item');
        let currentItem = $(this).find('.drop-tabs-list__current');
        let currentItemText = currentItem.find('.drop-tabs-list__current-text');
        let tabsList = $(this).find('.drop-tabs-list__list');
        let overflow = $(this).find('.drop-tabs-list__wrap');



        if (overflow.prop('scrollWidth') > overflow.width()) {
            tabsList.css('margin-bottom', '15px');
        } else {
            tabsList.css('justify-content', 'space-around');
        }

        currentItem.click(function (e) {
            $(this).toggleClass('drop-tabs-list__current--open');
            tabsList.slideToggle(200);
            tabsList.toggleClass('drop-tabs-list__list--open');
        });

        // Добавляем первому элемену активывный класс
        $(this).find('.drop-tabs-content').find('.drop-tabs-content__item').first().addClass('drop-tabs-content__item--open');
        allItems.first().addClass('drop-tabs-list__item-current');
        currentItemText.text(allItems.first().text());

        // Вешаем событие клика на таб
        allItems.each(function (e) {
            $(this).click(function (e) {
                let tabId = $(this).data('tab-id');
                let allContent = $(this).parents('.drop-tabs').find('.drop-tabs-content').find('.drop-tabs-content__item');

                if (window.innerWidth <= 576) {
                    tabsList.slideToggle(200);
                    tabsList.toggleClass('drop-tabs-list__list--open')
                }

                $(this).siblings('.drop-tabs-list__item').removeClass('drop-tabs-list__item-current');
                $(this).addClass('drop-tabs-list__item-current');

                // Устанавливаем текущий текст активного таба
                currentItemText.text($(this).text());

                // Открываем по клику нужный контент
                allContent.each(function (e) {

                    if ($(this).data('tab-id') == tabId) {
                        $(this).addClass('drop-tabs-content__item--open');
                    } else {
                        $(this).removeClass('drop-tabs-content__item--open');
                    }
                });
            });
        });

    });



    // Скрипт, который инициализирует слайдеры видеоблока

    $('.video-block').each(function (e) {

        let ID = $(this).find('.video-block__slider').attr('id');
        let IDNav = $(this).find('.video-block__slider-nav').attr('id');

        console.log(ID);

        if (ID) {

        }

        // thisSwiperVideo_[e] = new Swiper(".video-block__slider", {
        //     spaceBetween: 10,
        //     thumbs: {
        //         swiper: videoSliderNav1,
        //     }
        // });

        // thisSwiperVideoNav_[e] = new Swiper(".video-block__slider-nav", {
        //     spaceBetween: 10,
        //     slidesPerView: 2,
        //     freeMode: true,
        //     watchSlidesProgress: true,
        // });

    });

    // // Вспомогательный (навигационный).
    // // Всегда инициализируется первым, чем основной.
    // // Ставим в коде раньше.
    // var videoSliderNav1 = new Swiper(".video-block__slider-nav", {
    //     spaceBetween: 10,
    //     slidesPerView: 2,
    //     freeMode: true,
    //     watchSlidesProgress: true,
    // });


    // // Основной слайдер
    // var videoSlider1 = new Swiper(".video-block__slider", {
    //     spaceBetween: 10,
    //     thumbs: {
    //         swiper: videoSliderNav1,
    //     }
    // });

});