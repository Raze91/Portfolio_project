

const btn = document.getElementById('btn');
const overlay = document.getElementById('overlay');


btn.addEventListener('click', function() {
    overlay.classList.toggle('none')
})


overlay.addEventListener("click", function(){
    overlay.classList.toggle('none');
}); 
