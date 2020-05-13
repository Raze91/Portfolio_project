$(document).ready(function () {
    $(document).on("scroll", onScroll);

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav").style.backgroundColor = '#055194';
        } else {
            document.getElementById("nav").style.backgroundColor = 'transparent';
        }
        prevScrollpos = currentScrollPos;
    }
})