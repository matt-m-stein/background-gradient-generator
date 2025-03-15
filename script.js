const direction = document.getElementById('direction');
// const firstColor = document.getElementById('first-color');
// const secondColor = document.getElementById('second-color');
const switchIcon = document.getElementById('switch-icon');
const swatchContainer = document.getElementById('swatch-container');
const nav = document.querySelector('nav');
const button = document.getElementById('btn');

console.log(direction);

console.log(switchIcon);
console.log(swatchContainer);

let menuDisplay = true;

let colors = [
    "#7be383",
    '#5cf2de',
    '#ffffff'
];

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

/* function changeBackground(dir, mainColor, secondColor) {
    document.body.style.backgroundImage = `linear-gradient(${dir}, ${mainColor}, ${secondColor})`;
    direction.style.borderColor = mainColor;
    direction.style.backgroundColor = secondColor;
} */

function changeBackground(dir, swatchesColors) {
    let gradient = `linear-gradient(${dir}`;

    swatchesColors.forEach((color) => {
        gradient += `, ${color}`;
    });

    gradient += `)`;

    console.log(gradient)
    
    document.body.style.backgroundImage = gradient;
    // direction.style.borderColor = mainColor;
    // direction.style.backgroundColor = secondColor;
}

/* firstColor.addEventListener('change', (event) => {
    color1 = event.target.value;
    changeBackground(dir, color1, color2);
});

secondColor.addEventListener('change', (event) => {
    color2 = event.target.value;
    changeBackground(dir, color1, color2);
}); */

direction.addEventListener('input', (event) => {
    dir = `${event.target.value}deg`;
    changeBackground(dir, colors);
});

changeBackground(dir, colors);

function createColorSwatchesElements(color) {
    const swatch = document.createElement(`input`);
    swatch.value = color;
    swatch.classList.add('swatch');
    swatch.type = 'color';
    swatchContainer.appendChild(swatch);
    return swatch;
}

colors.forEach((color, index) => {
    addToEachSwatch(color, index);
});

function addToEachSwatch(color, index) {
    swatchElement = createColorSwatchesElements(color);
    swatchElement.addEventListener('change', (event) => {
        colors[index] = event.target.value;
        changeBackground(dir, colors);
    });
}

button.addEventListener('click', () =>{
    console.log(colors.length);
    colors.push("#0000FF");
    console.log(colors.length);
    addToEachSwatch(colors[colors.length - 1], colors.length - 1);
    
    changeBackground(dir, colors);
});