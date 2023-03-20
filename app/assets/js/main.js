/*
    desc: Универсальный скрипт раскрытия/скрытия списка. Реализовано для БЭМ блока blocks/_drop-listing.scss
*/
$(function() {

    $('.drop-listing').each(function(e) {

        $(this).mousemove(function(e) {
            if(!$(this).hasClass('drop-listing--open')) {
                $(this).toggleClass('drop-listing--open');
            }
        });
        
        $(this).mouseleave(function(e) {
            $(this).toggleClass('drop-listing--open');
        });

    });


    // Для карточек с текстом
    $('.card-info').each(function(e) {
        $(this).click(function(e) {
            $(this).toggleClass('card-info--open');
        });
    });
});