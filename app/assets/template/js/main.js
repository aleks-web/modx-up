/*
    desc: Универсальный скрипт раскрытия/скрытия списка. Реализовано для БЭМ блока blocks/_drop-listing.scss
*/
$(function () {

    /*
        Объявление функций
    */

    // ? Функция открытия модальных окон
    function modalOpen(modalID = null) {
        // Если передается селектор, то добавляем ему класс open
        if (modalID) {
            $(modalID).addClass('open');
            $('.modal').length > 0 ? $('body').addClass('body-modal-open') : '';

            $('.open').length > 1 ? $(modalID).addClass('modal-bg') : '';
        }
    }
    // END Функция открытия модальных окон

    // ? Функция, которая закрывает модальное окно(а)
    function modalClose(element = null) {
        if (!element) {
            //Если аргумент не задан (в данном случае модальное окно), то закрываем все имеющиеся модалки
            //(тобишь все элементы имеющие класс .open)

            $('.open').each(function (e) {
                $(this).first().removeClass('open')
            });
            $('body').removeClass('body-modal-open');
        } else {
            //Если есть модалка, то закрываем её
            $(element).removeClass('open');
            $('.open').length == 0 ? $('body').removeClass('body-modal-open') : '';
        }
    }
    // END Функция, которая закрывает модальное окно(а)





    // Следим за событием af_complete. AjaxForm
    $(document).on('af_complete', function (e, res) {

        // При успешной отправке
        if (res.success) {
            let title = null;
            let thankText = null;

            // Получаем введенное имя пользователя
            let userName = $(res.form).find('input.username').val();
            // Формируем title модального окна
            if (userName) {
                title = userName + ', спасибо';
            } else {
                title = 'Спасибо';
            }

            // Получаем текст благодарности за отправку формы (текст успешного сообщения)
            thankText = $(res.form).find('.thank-text').text();
            // Если текста успешного сообщения
            if (!thankText) {
                thankText = 'Данные успешно отправлены';
            }

            // Заполняем модальную форму сформированными сообщениями
            $('#modal-thank').find('.modal-thank__title').text(title); // Заполняем тайтл
            $('#modal-thank').find('.modal-thank__desc').text(thankText); // Заполняем основной текст

            // Закрываем все окна
            $('.open').each(function (e) {
                $(this).first().removeClass('open')
            });

            // Открываем модальное окно с благодарностью
            $('#modal-thank').addClass('open');
        }

        if (!res.success) {
            console.log("Ошибка");
        }
    });
    // END Следим за событием af_complete. AjaxForm




    // Функция переноса курсора в начало строки
    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    // END Функция переноса курсора в начало строки

    // Маска для всех input с name = phone
    $('input[name=phone]').each(function (e) {
        $(this).mask("+7 (999) 999 99-99");
    });

    $('input[name=phone]').click(function (e) {
        $(this).setCursorPosition(4);
    });
    // END Маска для всех input с name = phone


    // Кнопка "Бургер"
    $('.nav__burger').click(function (e) {
        $('.mobile-menu-sidebar').addClass('open');
        $('body').addClass('body-modal-open');
    });
    // END Кнопка "Бургер"

    // Поведение мобильного меню
    $('.mobile-nav').click(function (e) {
        if ($(e.target).siblings('ul.mobile-nav__sub-menu').length != 0) {
            e.preventDefault();
            $(e.target).siblings('ul.mobile-nav__sub-menu').slideToggle();
            $(e.target).toggleClass('mobile-nav__item--open');
        };
    });
    // END Поведение мобильного меню

    // Одно событие на несколько
    $('body').click(function (e) {

        // Удаляем затемнение фона через функцию modalClose если клик прошел по фону
        if ($(e.target).hasClass('body-modal-open')) {
            modalClose();
        }

        // Закрытие модального окна
        if ($(e.target).hasClass('modal') && $(e.target).hasClass('open') && $(e.target).attr('id')) {
            modalClose('#' + $(e.target).attr('id'));
        }

        // Обобщенный скрипт. Согласие на обработку персональных данных
        if ($(e.target).hasClass('agree')) {
            let input = $(e.target).parents('form').find('input[name="agree"]');

            $(e.target).toggleClass('agree--checked');

            if ($(e.target).hasClass('agree--checked')) {
                input.val('true');
            } else {
                input.val('');
            }
        }


        // Если клик по кнопке закрыть (по любому элементу с классом btn-close)
        if ($(e.target).hasClass('btn-close') || $(e.target).hasClass('modal-close')) {
            // Удаляем у родителя текущей кнопки класс .open
            $(e.target).parents('.open').removeClass('open');

            // Проверяем, есть ли еще открытые модальные окна (присутствует ли класс .open)
            // Если нет, то удаляем затемнение фона через функцию modalRemove
            $('.open').length == 0 ? modalClose() : '';
        }



        // Клик по data-modal-id (открываем модальное окно)
        // Если клик прошел по элементу с атрибутом data-modal-id
        // data-modal-id - атрибут, значение которого содержит id модального окна (у модалки должен быть атрибут id с соответствующим селектором), которое необходимо открыть
        // Открываем при помощи функции modalOpen. Передаем в нее селектор окна
        if ($(e.target).data('modal-id') && $(e.target).data('modal-id') != '' && $(e.target).data('modal-id') != 'false') {
            e.preventDefault();
            modalOpen($('#' + $(e.target).data('modal-id')));
        }
        // END Клик по data-modal-id

    });

    // Событие скрола
    window.addEventListener('scroll', function (e) {
        let scrollTop = this.pageYOffset;
        let margin = $('.message').outerHeight() + 'px';
        let bottom = $('.message').css('bottom');

        if ($('.message').hasClass('open')) {
            $('.message').addClass('open');
            $('.fixed-sidebar').css({'bottom': bottom, 'margin-bottom': margin});
        }

        // Показываем сообщение (плашка снизу справа)
        if (scrollTop > 2500 && !$('.message').hasClass('open') && $.cookie('messageHasClose') != 'true') {

            $('.message').find('.btn-close').click(function (e) {
                $.cookie('messageHasClose', 'true', { expires: 1, path: '/' });
                $('.fixed-sidebar').removeAttr('style');
            });

            $('.message').addClass('open');
            $('.fixed-sidebar').css({'bottom': bottom, 'margin-bottom': margin});
        }
        // END Показываем сообщение
    });

    window.addEventListener('resize', function(e) {
        let margin = $('.message').outerHeight() + 'px';
        let bottom = $('.message').css('bottom');
        $('.fixed-sidebar').css({'bottom': bottom, 'margin-bottom': margin});
    });
    // END Событие скрола



    $('.drop-listing').each(function (e) {
        $(this).mousemove(function (e) {
            if (!$(this).hasClass('drop-listing--open')) {
                $(this).addClass('drop-listing--open');
            }
        });
        $(this).mouseleave(function (e) {
            $(this).removeClass('drop-listing--open');
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


    // Инициализация слайдеров в модальных окнах
    $('.modal-content').each(function (e) {

        let ID = '#' + $(this).find('.modal-content__slider').attr('id');

        // Инициализируем если нашелся элемент
        if (ID) {
            new Swiper(ID, {
                spaceBetween: 10,
                loop: true,
                speed: 400,
                autoHeight: true,
                autoplay: {
                    delay: 5000,
                },

                navigation: {
                    nextEl: '.slider__button-next',
                    prevEl: '.slider__button-prev',
                },
            });
        }

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