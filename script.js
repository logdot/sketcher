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

function GenerateGrid() {
    container.style.cssText = `grid-template-columns: repeat(${length}, 1fr); grid-template-rows: repeat(${length}, 1fr);`;

    for (let i = 0; i < length * length; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = RainbowGenerator();
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
