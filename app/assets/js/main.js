/*
    desc: Универсальный скрипт раскрытия/скрытия списка. Реализовано для БЭМ блока blocks/_drop-listing.scss
*/
$(function() {

    $('.drop-listing').each(function(e) {

        $(this).mousemove(function(e) {
            if (!$(this).find('.drop-listing__list').hasClass('drop-listing__list--open')) {
                $(this).find('.drop-listing__list').toggleClass('drop-listing__list--open');
                $(this).find('.drop-listing__arrow').toggleClass('drop-listing__arrow--open');
            }
        });
        
        $(this).mouseleave(function(e) {
            $(this).find('.drop-listing__list').toggleClass('drop-listing__list--open');
            $(this).find('.drop-listing__arrow').toggleClass('drop-listing__arrow--open');
        });

    });
});