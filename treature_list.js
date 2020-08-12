const minMap = document.querySelector('.minMap');

minMap.addEventListener('click', () => {
    console.log('minMap onclick');

    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";



});

const close = document.querySelector('.closeMap');
close.addEventListener('click', () => {
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "hidden";
});