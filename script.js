let length = 10;
let lengthInput = document.getElementById('length-input');
let lengthText = document.getElementById('length-text');

lengthInput.value = length;
lengthText.innerHTML = length;

let container = document.querySelector('.container');

let colorInput = document.getElementById('color-input');

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
            cell.style.backgroundColor = ShadeGenerator(cell.style.backgroundColor);
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
