const direction = document.getElementById("direction");
// const firstColor = document.getElementById('first-color');
// const secondColor = document.getElementById('second-color');
// const switchIcon = document.getElementById("switch-icon");
const icons = document.getElementById("icons");
const swatchContainer = document.getElementById("swatch-container");
const nav = document.querySelector("nav");
const button = document.getElementById("btn");
const copyButton = document.getElementById("copy-button");
const gradientSelector = document.getElementById("gradient-selector");

console.log(direction);

// console.log(switchIcon);
console.log(swatchContainer);

let menuDisplay = true;

let colors = ["#99e98d", "#50f3f3", "#f2ed84"];

let dir = "90deg";
let gradientType = "linear";
let color1 = "#7be383";
let color2 = "#5cf2de";

icons.addEventListener("click", () => {
  nav.classList.toggle("hidden");
  icons.classList.toggle("toggle");
  // if (menuDisplay) {
  //   // switchIcon.classList.remove("fa-bars");
  //   // switchIcon.classList.add("fa-xmark");
  //   icons.classList.toggle('toggle');
  //   nav.classList.add("hidden");
  //   menuDisplay = !menuDisplay;
  // } else {
  //   // switchIcon.classList.remove("fa-xmark");
  //   // switchIcon.classList.add("fa-bars");
  //   nav.classList.remove("hidden");
  //   menuDisplay = !menuDisplay;
  // }
});

/* function changeBackground(dir, mainColor, secondColor) {
    document.body.style.backgroundImage = `linear-gradient(${dir}, ${mainColor}, ${secondColor})`;
    direction.style.borderColor = mainColor;
    direction.style.backgroundColor = secondColor;
} */

function changeBackground(dir, swatchesColors) {
  let gradient = `linear-gradient(${dir}`;
  // console.log(gradientType);
  // if (gradientType == "linear") {
  //   gradient =
  // } else {
  //   gradient = `radial-gradient(center to center`;
  // }

  swatchesColors.forEach((color) => {
    gradient += `, ${color}`;
  });

  gradient += `)`;

  console.log(gradient);

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

direction.addEventListener("input", (event) => {
  dir = `${event.target.value}deg`;
  changeBackground(dir, colors);
});

changeBackground(dir, colors);

function createColorSwatchesElements(color) {
  const swatch = document.createElement(`input`);
  swatch.value = color;
  swatch.classList.add("swatch");
  swatch.type = "color";
  swatchContainer.appendChild(swatch);
  return swatch;
}

colors.forEach((color, index) => {
  addToEachSwatch(color, index);
});

function createSwatchContainer(color) {
  const container = document.createElement("div");
  container.classList.add("swatch-container");
  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fa-solid fa-trash";
  const swatchElement = createColorSwatchesElements(color);
  const clipboardBtn = document.createElement("i");
  clipboardBtn.className = "fa-solid fa-clipboard";
  container.appendChild(deleteBtn);
  container.appendChild(swatchElement);
  container.appendChild(clipboardBtn);

  return {
    contents: container,
    swatch: swatchElement,
    delete: deleteBtn,
    copy: clipboardBtn,
  };
}

function addToEachSwatch(color, index) {
  const cont = createSwatchContainer(color);
  console.log(cont);
  cont.swatch.addEventListener("change", (event) => {
    colors[index] = event.target.value;
    changeBackground(dir, colors);
  });
  swatchContainer.appendChild(cont.contents);

  cont.delete.addEventListener("click", (event) => {
    event.target.parentElement.remove();
    delete colors[index];
    changeBackground(dir, colors);
  });

  cont.copy.addEventListener("click", (event) => {
    const color = event.target.previousSibling.value;
    copyToClipboard(color);
  });
}

button.addEventListener("click", () => {
  console.log(colors.length);
  colors.push("#0000FF");
  console.log(colors.length);
  addToEachSwatch(colors[colors.length - 1], colors.length - 1);

  changeBackground(dir, colors);
});

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  console.log(textarea);
  textarea.remove();
}

copyButton.addEventListener("click", (event) => {
  const outputText =
    `background-image: ` + document.body.style.backgroundImage + `;`;
  copyToClipboard(outputText);
  console.log(outputText);
});

// gradientSelector.addEventListener("change", (event) => {
//   gradientType = event.target.value;
//   changeBackground(dir, colors);
// });
