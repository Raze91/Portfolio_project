$(document).ready(function () {

    $(document).on("scroll", onScroll);

    function onScroll(event) {
        const scrollPos = $(document).scrollTop();
        $('a').each(function () {
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

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            $("nav").style.backgroundColor = '#055194';
        } else {
            $("nav").style.backgroundColor = 'transparent';
        }
        prevScrollpos = currentScrollPos;
    }


    $('.burger').on('click', function (event) {

        if ($('#nav').attr('data-state') === 'closed') {

            $('#nav').attr('data-state', 'opened');
            $('.burger').empty();
            $('.burger').html('<i class="fas fa-times fa-lg"></i>');

        } else {

            $('#nav').attr('data-state', 'closed');
            $('.burger').empty();
            $('.burger').html('<i class="fas fa-bars fa-lg"></i>');

        }

    });
})