// Get all the elements that are used in the project and are referred to by their ID
const direction = document.getElementById("direction");
const icons = document.getElementById("icons");
const swatchContainer = document.getElementById("swatch-container");
const nav = document.querySelector("nav");
const newButton = document.getElementById("btn");
const copyButton = document.getElementById("copy-button");

// The array that holds all the currently selected colors
let colors = [];

// When the page loads for the first time, these are the three default colors
const defaultColors = ["#95e989", "#50f3f3", "#f2ed84"];

// The default color for a new swatch
const defaultNewColor = "#54eda0";

// Initial direction of the angle for left to right
let dir = "90deg";

// The type of gradient to use, right now it only supports linear
let gradientType = "linear";

// This function is called whenever there is a change to the angle or colors to modify the body's background
function changeBackground(dir, swatchesColors) {
  // This defines the CSS to call before the colors are added
  let gradient = `${gradientType}-gradient(${dir}`;

  // For each color, add it to the gradient string
  swatchesColors.forEach((color) => {
    gradient += `, ${color}`;
  });

  // Finally end the string with a closing parenthesis
  gradient += `)`;

  console.log(gradient);

  // Set the body's background to be the gradient
  document.body.style.backgroundImage = gradient;

  // Save the colors to local storage
  saveToLocalStorage(swatchesColors);
}

// Given a color, create the color choosing input element
function createColorSwatchesElements(color) {
  // First create an input element
  const swatch = document.createElement(`input`);

  // Its type is of color for choosing the color
  swatch.type = "color";

  // Add the appropriate class
  swatch.classList.add("swatch");

  // Its value is the inputed color
  swatch.value = color;

  return swatch;
}

// This function creates each container that holds a color for the Front End
function createSwatchContainer(color) {
  // First create the container
  const container = document.createElement("div");

  // Add the Class to the container
  container.classList.add("swatch-container");

  // Create an element for the delete button
  const deleteBtn = document.createElement("i");

  // Add the Font Awesome classes
  deleteBtn.className = "fa-solid fa-trash";

  // Create the input element for the color
  const swatchElement = createColorSwatchesElements(color);

  // Make the element for the copy color button
  const clipboardBtn = document.createElement("i");

  // Add the copy button's Font Awesome classes
  clipboardBtn.className = "fa-solid fa-clipboard";

  // Add all three elements to the Swatch Container
  container.appendChild(deleteBtn);
  container.appendChild(swatchElement);
  container.appendChild(clipboardBtn);

  // Return an object with the different elements
  return {
    contents: container,
    swatch: swatchElement,
    delete: deleteBtn,
    copy: clipboardBtn,
  };
}

// Given an index, it removes that index from the color array
function removeColor(index) {
  // Used to copy the color array
  let tempColorArray = [];

  // Loop through all the colors in the color array
  colors.forEach((color, i) => {
    // Unless inndex == i, add the current color to the temp color array
    if (i != index) {
      tempColorArray.push(color);
    }
  });

  // Assign array containing all but one element back into the colors array
  colors = tempColorArray;
}

// Given a color and an index, creates all the functionality for a color block given a color and the position of that color as an index
function addToEachSwatch(color, index) {
  // Create the swatch container and assign it to cont
  const cont = createSwatchContainer(color);

  // Add the contents to the Swatch Container
  swatchContainer.appendChild(cont.contents);

  // To the Color Input, add an Event Listener for whenever it changes
  cont.swatch.addEventListener("change", (event) => {
    // Update this index in the colors array with the new value
    colors[index] = event.target.value;

    // Update the gradient
    changeBackground(dir, colors);
  });

  // When the delete button is clicked
  cont.delete.addEventListener("click", (event) => {
    // Remove the element from the DOM
    event.target.parentElement.remove();

    // Remove this color from the colors array
    removeColor(index);

    // Update the gradient
    changeBackground(dir, colors);
  });

  // When the copy button is clicked
  cont.copy.addEventListener("click", (event) => {
    // Get the previous element's which is the Color input's Color
    const color = event.target.previousSibling.value;

    // Copy the color to  the clipboard
    copyToClipboard(color);
  });
}

// This function copies the passed in text to the clipboard
function copyToClipboard(text) {
  // First create a new text area element
  const textarea = document.createElement("textarea");

  // Set the text area's text to the passed in text
  textarea.value = text;

  // Append the textarea to the body
  document.body.appendChild(textarea);

  // Select the text area and issue the copy command that copies it to the clipboard
  textarea.select();
  document.execCommand("copy");

  // Remove the Text Area from the DOM
  textarea.remove();
}

// Given some data, it saves it to local storage in the colors array
function saveToLocalStorage(data) {
  // Format the data as JSON
  const toStorage = JSON.stringify(data);

  // Save the JSON to the colors value in local storage
  localStorage.setItem("colors", toStorage);
}

// Returns which colors should be loaded at startup
function getFromLocalStorage() {
  // See what is in local storage
  const data = JSON.parse(localStorage.getItem("colors"));

  // If the data is null, return the default colors
  if (data == null) {
    return defaultColors;

    // If the Data array has a length greater than 0
  } else if (data.length > 0) {
    // This is used to hold all the colors that aren't null
    let notNullData = [];

    // For each item, if it isn't null, add it to the temp array
    data.forEach((item, index) => {
      if (item != null) {
        notNullData.push(item);
      }
    });

    // Return the list of colors that aren't null
    return notNullData;

    // In all other cases, return the default colors
  } else {
    return defaultColors;
  }
}

// This is the script that is called at startup
function startScript() {
  // First get the colors
  colors = getFromLocalStorage();

  // If the colors has a length of 0 or less
  if (colors.length <= 0) {
    // Use the default colors
    colors = defaultColors;
  }

  // Loop through each color and create the Swatch
  colors.forEach((color, index) => {
    addToEachSwatch(color, index);
  });

  // This button is the button to copy the whole CSS gradient property to the clipboard
  copyButton.addEventListener("click", (event) => {
    // Set the output text...
    const outputText =
      `background-image: ` + document.body.style.backgroundImage + `;`;

    // ...copy it to the clipboard
    copyToClipboard(outputText);
  });

  // Whenever the New Color button is clicked...
  newButton.addEventListener("click", () => {
    // First append an element to the color array
    colors.push(defaultNewColor);

    // Append this swatch to the Swatch Container, pass in this color and this index
    addToEachSwatch(colors[colors.length - 1], colors.length - 1);

    // Update the gradient
    changeBackground(dir, colors);
  });

  // When there is an input on the angle input element, update the direction variable and call Change Background
  direction.addEventListener("input", (event) => {
    dir = `${event.target.value}deg`;
    changeBackground(dir, colors);
  });

  // When the icons are clicked on, toggle the menu on the left and change the icon
  icons.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    icons.classList.toggle("toggle");
  });

  // Update the gradient
  changeBackground(dir, colors);
}

// Call the startup script
startScript();
