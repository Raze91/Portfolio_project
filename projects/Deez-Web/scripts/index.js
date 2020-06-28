
const favStorage = localStorage;
let favTracks = [];
let finalUrl;

$('#submit').on('click', function (e) {
    e.preventDefault();
    let title = $('#title').val();
    let sort = $('#sortBy').val();
    let url = `https://api.deezer.com/search?q=${title}&output=jsonp&order=${sort}`

    onSubmit(url);
});

$('#scrollUp').on('click', function (e) {
    e.preventDefault();
    $("html, body").animate({scrollTop : 0}, 1500);
});

if (sessionStorage.getItem('page')) {
    finalUrl = sessionStorage.getItem('page');
    onSubmit(finalUrl);
} else {
    $('#tracks').html('<h3>Commencez par rechercher en utilisant le formulaire ci-dessus</h3>');
}

if (favStorage.getItem('favoris')) {

    ///////////////////////////////////////////
    ///////////// PAGE FAVORIS ////////////////
    ///////////////////////////////////////////

    if (JSON.parse(favStorage.favoris).length > 0) {

        favTracks = JSON.parse(favStorage.getItem('favoris'));
        $.each(favTracks, function (index, fav) {
            $('#favTracks').append(
                `<div class='track'>
                            <div>
                                <a id='test-${fav.id}' class='checked'><i class="fas fa-times fa-lg"></i></i></a>
                                <img src='${fav.album.cover}' alt="">
                                <div class='track-data'>
                                <h3>${fav.title_short}</h3>
                                <p>${fav.artist.name}</p>
                                </div>
                            </div>
                            <audio controls src="${fav.preview}"></audio>
                    </div>`
            )

            $(`#test-${fav.id}`).on('click', function (e) {
                e.preventDefault();
                favTracks.splice(index, 1);
                favStorage.setItem('favoris', JSON.stringify(favTracks));

                reload();
            })

        })
    } else {
        $('#favTracks').append(
            `<h3>Vous n'avez pas encore de favoris ... Trouvez-en <a href="search.html" class='goFind'>ici</a> !</h3>`
        )
    }

    ///////////////////////////////////////
    //////////// PAGE ACCUEIL /////////////
    ///////////////////////////////////////

    if (favTracks.length > 0) {
        let rdmTrack = favTracks[getRandomNum(favTracks.length)]
        $('#randomFav').append(
            `<div class='randomTrack'>
                                <div>
                                    <img src='${rdmTrack.album.cover}' alt="">
                                    <div class='track-data'>
                                    <h3>${rdmTrack.title_short}</h3>
                                    <p>${rdmTrack.artist.name} / ${rdmTrack.album.title}</p>
                                    </div>
                                    </div>
                                    <audio controls src="${rdmTrack.preview}"></audio>
                                </div>`
        )

        $(`#rdmTrack`).on('click', function (e) {
            reload();
        })
    } else {
        $('#randomFav').append(
            `<h3>Vous n'avez pas encore de favoris ... Trouvez-en <a href="search.html" class='goFind'>ici</a> !</h3>`
        )
    }

} else {
    $('#favTracks').html(`<h3>Vous n'avez pas encore de favoris ... Trouvez-en <a href="search.html" class='goFind'>ici</a> !</h3>`)
}

function getRandomNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

///////////////////////////////////
///////// PAGE RECHERCHE //////////
///////////////////////////////////

function onSubmit(url) {
    $('#tracks').empty();

    $.ajax({
        url: url,
        dataType: 'jsonp',
    }).then((result) => {

        const results = result.data;
        const nextUrl = result.next;

        $('#next').one('click', function (e) {
            e.preventDefault();

            onNext(nextUrl);
        });

        $.each(results, function (index, result) {

            $('#tracks').append(
                `<div class='track'>
                    <div>
                    <a id='${result.id}' class='unchecked'><i class="fas fa-plus fa-lg"></i></a>
                    <img src='${result.album.cover}' alt="">
                    <div class='track-data'>
                    <h3>${result.title}</h3>
                    <p>${result.artist.name} / ${result.album.title}</p>

                    </div>
                    </div>
                    <audio controls src="${result.preview}"></audio>
                    </div>`
            );

            finalUrl = url;
            sessionStorage.setItem('page', finalUrl);

            for (let i = 0; i < favTracks.length; i++) {
                if (result.id === favTracks[i].id) {
                    setChecked(result);
                }
            }

            $(`#${result.id}`).on('click', function (e) {
                e.preventDefault();
                if ($(`#${result.id}`).attr('class') === 'unchecked') {
                    addFav(result);
                    setChecked(result);
                } else if ($(`#${result.id}`).attr('class') === 'checked') {
                    setUnchecked(result);
                    delFav(favTracks, result);
                }
            });

        })

    })
        .catch((err) => {
            if (err) throw err;
        })
}

function onNext(nextUrl) {

    $.ajax({
        url: nextUrl,
        dataType: 'jsonp',
    }).then((nextResult) => {

        const nextResults = nextResult.data;
        const nextUrl = nextResult.next;

        $('#next').on('click', function (e) {
            e.preventDefault();

            onNext(nextUrl);
        });

        $.each(nextResults, function (index, nextResult) {

            $('#tracks').append(
                `<div class='track'>
                    <div>
                    <a id='${nextResult.id}' class='unchecked'><i class="fas fa-plus fa-lg"></i></a>
                    <img src='${nextResult.album.cover}' alt="">
                    <div class='track-data'>
                    <h3>${nextResult.title}</h3>
                    <p>${nextResult.artist.name} / ${nextResult.album.title}</p>
                    </div>
                    </div>
                    <audio controls src="${nextResult.preview}"></audio>
                </div>`
            );

            for (let i = 0; i < favTracks.length; i++) {
                if (nextResult.id === favTracks[i].id) {
                    setChecked(nextResult);
                }
            }

            $(`#${nextResult.id}`).on('click', function (e) {
                e.preventDefault();

                if ($(`#${nextResult.id}`).attr('class') === 'unchecked') {
                    addFav(nextResult);
                    setChecked(nextResult);
                } else if ($(`#${nextResult.id}`).attr('class') === 'checked') {
                    setUnchecked(nextResult);
                    delFav(favTracks, nextResult);
                }
            });

        })

    })
        .catch((err) => {
            if (err) throw err;
        })
}

function addFav(result) {

    if ($(`#${result.id}`).attr('class') === 'unchecked') {
        favTracks.push(result);
        favStorage.setItem('favoris', JSON.stringify(favTracks));
    }
}

function delFav(favTracks, result) {

    let index;

    for (let i = 0; i < favTracks.length; i++) {
        if (favTracks[i].id === result.id) {
            index = i
        }
    }
    favTracks.splice(index, 1);
    favStorage.setItem('favoris', JSON.stringify(favTracks));
}

function reload() {
    document.location.reload(true);
}

function setChecked(result) {
    $(`#${result.id}`).empty();
    $(`#${result.id}`).html('<i class="fas fa-times fa-lg"></i>');
    $(`#${result.id}`).removeClass('unchecked').addClass('checked');
}

function setUnchecked(result) {
    $(`#${result.id}`).empty();
    $(`#${result.id}`).html('<i class="fas fa-plus fa-lg">');
    $(`#${result.id}`).removeClass('checked').addClass('unchecked');
}