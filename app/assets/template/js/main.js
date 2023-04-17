/*
    desc: Универсальный скрипт раскрытия/скрытия списка. Реализовано для БЭМ блока blocks/_drop-listing.scss
*/
$(function () {

    // Функция проверки элемента на скрол
    function hasScroll(element) {
        const conteinerScroll = document.querySelector(element).scrollWidth;
        const containerVisible = document.querySelector(element).offsetWidth;

        if (conteinerScroll > containerVisible) {
            return true;
        } else {
            return false;
        }
    }


    /*
        Главное меню
    */
    function modalAdd() {
        $('body').addClass('body-modal-open');
    }

    // ? Функция, которая закрывает модальное окно(а)
    function modalRemove(element = null) {
        $('body').removeClass('body-modal-open');

        if (!element) {
            /*
                Если аргумент не задан (в данном случае модальное окно), то закрываем все имеющиеся модалки
                (тобишь все элементы имеющие класс .open)
            */

            $('.open').each(function (e) {
                $(this).first().removeClass('open')
            });
        } else {
            /*
                Если есть модалка, то закрываем её
            */
            $(element).removeClass('open');
        }
    }

    // Мобильное меню
    $('.nav__burger').click(function (e) {
        $('.mobile-menu-sidebar').addClass('open');

        modalAdd();
    });

    // Поведение мобильного меню
    $('.mobile-nav').click(function (e) {
        if ($(e.target).siblings('ul.mobile-nav__sub-menu').length != 0) {
            e.preventDefault();
            $(e.target).siblings('ul.mobile-nav__sub-menu').slideToggle();
            $(e.target).toggleClass('mobile-nav__item--open');
        };
    });

    $('body').click(function (e) {

        // Удаляем затемнение фона через функцию modalRemove если клик прошел по фону
        if ($(e.target).hasClass('body-modal-open')) {
            modalRemove();
        }

        // Если клик по кнопке закрыть (по любому элементу с классом btn-close)
        if ($(e.target).hasClass('btn-close')) {
            $(e.target).parent().removeClass('open'); // Удаляем у родителя текущей кнопки класс .open

            // Проверяем, есть ли еще открытые модальные окна (присутствует ли класс .open)
            // Если нет, то удаляем затемнение фона через функцию modalRemove
            $('.open').length == 0 ? modalRemove() : '';
        }


    });




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



    // Скрипт, который инициализирует слайдеры видеоблоков
    $('.video-block').each(function (e) {

        /**
         * Получаем уникальные идентификаторы блоков видео
         * Основной блок - ID, вспомогательный (или навигационный) - IDNav
        */
        let ID = '#' + $(this).find('.video-block__slider').attr('id');
        let IDNav = '#' + $(this).find('.video-block__slider-nav').attr('id');

        // Инициализируем если присутствует навигационный блок
        if (IDNav) {

            new Swiper(IDNav, {
                spaceBetween: 10,
                slidesPerView: 2,
                freeMode: true,
                watchSlidesProgress: true,
            });
        }

        // Инициализируем если присутствует основной блок
        if (ID) {
            new Swiper(ID, {
                spaceBetween: 10,
                thumbs: {
                    swiper: IDNav,
                }
            });
        }

    });

});