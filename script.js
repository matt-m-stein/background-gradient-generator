const direction = document.getElementById('direction');
const firstColor = document.getElementById('first-color');
const secondColor = document.getElementById('second-color');
const switchIcon = document.getElementById('switch-icon');

console.log(direction);
console.log(firstColor);
console.log(secondColor);
console.log(switchIcon);

let menuDisplay = true;

let dir = '0deg';
let color1 = "#888888";
let color2 = "#ffffff"

switchIcon.addEventListener('click', () => {
    if (menuDisplay) {
        switchIcon.classList.remove('fa-bars');
        switchIcon.classList.add('fa-xmark');
        menuDisplay = !menuDisplay;
    } else {
        switchIcon.classList.remove('fa-xmark');
        switchIcon.classList.add('fa-bars');
        menuDisplay = !menuDisplay;
    }
});

function changeBackground(dir, color1, color2) {
    document.body.style.backgroundImage = `linear-gradient(${dir}, ${color1}, ${color2})`;
    document.querySelector('nav').classList.toggle('hide');
}

changeBackground(dir, color1, color2);

firstColor.addEventListener('change', (event) => {
    color1 = event.target.value;
    changeBackground(dir, color1, color2);
});

secondColor.addEventListener('change', (event) => {
    color2 = event.target.value;
    changeBackground(dir, color1, color2);
});

direction.addEventListener('input', (event) => {
    dir = `${event.target.value}deg`;
    changeBackground(dir, color1, color2);
})