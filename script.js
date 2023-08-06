var length = 10;

let container = document.querySelector('.container');

container.style.cssText = `grid-template-columns: repeat(${length}, 1fr); grid-template-rows: repeat(${length}, 1fr);`;

for (let i = 0; i < length * length; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = 'red';
    });

    container.appendChild(cell);
}