var button = document.getElementById('button');
var pokeball_top = document.getElementById('pokeball-top');
var pokeball_bottom = document.getElementById('pokeball-bottom');
var content = document.getElementById('content');


button.addEventListener('click', function() {
    pokeball_top.classList.toggle('pokeball-top-open');
    button.classList.toggle('pokeball-middle-open');
    pokeball_bottom.classList.toggle('pokeball-bottom-open');
    content.classList.toggle('content-open');
});