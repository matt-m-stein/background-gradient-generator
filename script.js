const direction = document.getElementById('direction');
const firstColor = document.getElementById('first-color');
const secondColor = document.getElementById('second-color');
const switchIcon = document.getElementById('switch-icon');
const nav = document.querySelector('nav');

console.log(direction);
console.log(firstColor);
console.log(secondColor);
console.log(switchIcon);

let menuDisplay = true;

let dir = '90deg';
let color1 = "#7be383";
let color2 = "#5cf2de";

switchIcon.addEventListener('click', () => {
    if (menuDisplay) {
        switchIcon.classList.remove('fa-bars');
        switchIcon.classList.add('fa-xmark');
        nav.classList.add('hidden');
        menuDisplay = !menuDisplay;
    } else {
        switchIcon.classList.remove('fa-xmark');
        switchIcon.classList.add('fa-bars');
        nav.classList.remove('hidden');
        menuDisplay = !menuDisplay;
    }
});

function changeBackground(dir, mainColor, secondColor) {
    document.body.style.backgroundImage = `linear-gradient(${dir}, ${mainColor}, ${secondColor})`;
    direction.style.borderColor = mainColor;
    direction.style.backgroundColor = secondColor;
}

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
});

changeBackground(dir, color1, color2);
firstColor.value = color1;
secondColor.value = color2;