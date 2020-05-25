$(document).ready(function () {

    $(document).on("scroll", onScroll);

    function onScroll(event) {
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

    let prevScrollpos = window.pageYOffset;
    if ($('#nav').attr('data-state') === 'closed') {
        window.onscroll = function () {
            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                $("nav").css('backgroundColor','#055194')
            } else {
                $("#nav").css('backgroundColor','transparent');
            }
            prevScrollpos = currentScrollPos;
        }
    }


    $('.burger').on('click', function (event) {

        if ($('#nav').attr('data-state') === 'closed') {

            $('#nav').attr('data-state', 'opened');
            $('.burger').empty();
            $('.burger').html('<i class="fas fa-times fa-lg"></i>');
            $('#nav').addClass('fullnav');

        } else {

            $('#nav').attr('data-state', 'closed');
            $('.burger').empty();
            $('.burger').html('<i class="fas fa-bars fa-lg"></i>');
            $('#nav').removeClass('fullnav');
        }

    });
})