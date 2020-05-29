$(document).ready(function () {

    $(document).on("scroll", onScroll);

    function onScroll() {
        const scrollPos = $(document).scrollTop();
        $('#nav a').each(function () {
            const currLink = $(this);
            const refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }

    $('.burger').on('click', function () {

        if ($('#nav').attr('data-state') === 'closed') {

            $('#nav').attr('data-state', 'opened');
            $('.burger').empty();
            $('.burger').html('<i class="fas fa-times fa-2x"></i>');
            $('#nav').addClass('fullnav');

        } else {

            $('#nav').attr('data-state', 'closed');
            $('.burger').empty();
            $('.burger').html('<i class="fas fa-bars fa-2x"></i>');
            $('#nav').removeClass('fullnav');
        }

    });
})