const slider = document.getElementById("myRange");
const speed = document.getElementById("speed");
const time = document.getElementById('time');
const vehicule = document.getElementById('transport');

const list_vehicules = [
    { speed: 10, name: 'un homme à pied' },
    { speed: 65, name: 'un cheval pur-sang' },
    { speed: 325, name: 'une voiture ferrari' },
    { speed: 740, name: 'un avion jet' },
    { speed: 1185, name: 'un avion de ligne' },
    { speed: 5500, name: 'une fusée Apollo 11' }
]

const distance = 384400;
const ToMs = 3600000;

speed.innerHTML = slider.value;
time.innerHTML = msToDate((distance / speed.innerHTML) * ToMs);
vehicule.innerHTML = list_vehicules[0].name;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {

    let actualVehicule = list_vehicules[0].name;
    let ecartMin = Math.abs(slider.value - list_vehicules[0].speed);

    for (let i = 0; i < list_vehicules.length; i++) {

        let ecart = Math.abs(slider.value - list_vehicules[i].speed);

        if (ecart < ecartMin) {

            actualSpeed = list_vehicules[i].speed;
            ecartMin = ecart;
            actualVehicule = list_vehicules[i].name;
        }
    }

    speed.innerHTML = this.value;
    time.innerHTML = msToDate((distance / speed.innerHTML) * ToMs);
    vehicule.innerHTML = actualVehicule;
}

function msToDate(milliseconds) {
    //Get hours from milliseconds
    let hours = milliseconds / (1000 * 60 * 60);
    let absoluteHours = Math.floor(hours);
    let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return h + 'h ' + m + 'min ' + s + 'sec';
}
