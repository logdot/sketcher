let length = 8;
let lengthInput = document.getElementById('length-input');
let lengthText = document.getElementById('length-text');

lengthInput.value = length;
lengthText.innerHTML = length;

let container = document.querySelector('.container');

let colorInput = document.getElementById('color-input');

let colorPickerButton = document.getElementById('color-picker-button');
let rainbowButton = document.getElementById('rainbow-button');
let shadeButton = document.getElementById('shade-button');

let clearButton = document.getElementById('clear-button');

let colorGenerator = ColorPickerGenerator;

colorPickerButton.addEventListener('click', () => {
    colorGenerator = ColorPickerGenerator;
    colorPickerButton.classList.add('selected');
    rainbowButton.classList.remove('selected');
    shadeButton.classList.remove('selected');
});

rainbowButton.addEventListener('click', () => {
    colorGenerator = RainbowGenerator;
    rainbowButton.classList.add('selected');
    colorPickerButton.classList.remove('selected');
    shadeButton.classList.remove('selected');
});

shadeButton.addEventListener('click', () => {
    colorGenerator = ShadeGenerator;
    shadeButton.classList.add('selected');
    rainbowButton.classList.remove('selected');
    colorPickerButton.classList.remove('selected');
});

clearButton.addEventListener('click', () => {
    ClearGrid();
    GenerateGrid();
})

// This section contains our color generator functions.
// These ideally would be backed by some sort of interface, but I don't know how to do that yet in JS.
// These simply take the current color of the cell and return a new color.
// The new color may or may not be based on the current color.
//
// These are injected into the code that draws onto the grid.
// This way the coloring code can be agnostic to how we're selecting the color to use.
function ColorPickerGenerator(currColor) {
    return colorInput.value;
}

function RainbowGenerator(currColor) {
    randomNumber = () => Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

function ShadeGenerator(currColor) {
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(currColor);
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    red = Math.max(red - 25, 0);
    green = Math.max(green - 25, 0);
    blue = Math.max(blue - 25, 0);

    return `rgb(${red}, ${green}, ${blue})`;
}

function GenerateGrid() {
    container.style.cssText = `grid-template-columns: repeat(${length}, 1fr); grid-template-rows: repeat(${length}, 1fr);`;

    for (let i = 0; i < length * length; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = "rgb(255, 255, 255)";

        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = colorGenerator(cell.style.backgroundColor);
        });

        container.appendChild(cell);
    }
}

function ClearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

GenerateGrid();

lengthInput.onchange = () => {
    length = lengthInput.value;
    lengthText.innerHTML = length;

    ClearGrid();
    GenerateGrid();
}
