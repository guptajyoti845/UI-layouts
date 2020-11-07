const catclick = document.getElementById('cat');
const CountButtonHomeClicks = document.getElementById('countclick');
let counter=0;
catclick.addEventListener('click', function() {
    counter += 1;
    CountButtonHomeClicks.innerText = counter;
})
