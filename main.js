const grid = document.getElementById('grid');
let size = 3;
let level = 30;
let cellSize = 100;
let diff = 6;
let timeLimit = 5000; // Thời gian giới hạn 5 giây
let score = 0;
let timer;
const timeBar = document.getElementById('time-bar');
const scoreDisplay = document.getElementById('score');


function generateGrid(size) {
    if (size)
        grid.innerHTML = ''; // Clear grid
    if (size % diff == 0) {
        cellSize = cellSize / 2;
        diff = diff * 2;
    }
    scoreDisplay.innerHTML=`Score: ${score}`;
    grid.style.gridTemplateColumns = `repeat(${size},${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${size},${cellSize}px)`;
    grid.style.gap = cellSize >= 50 ? `${cellSize / 10}px` : '2px';
    const baseColor = getRandomColor();
    const diffColor = getSlightlyDifferentColor(baseColor);
    const diffIndex = Math.floor(Math.random() * size * size);

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.backgroundColor = i === diffIndex ? diffColor : baseColor;
        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.onclick = () => handleCellClick(i === diffIndex);
        grid.appendChild(cell);
    }

    startTimer();
}

function startTimer() {
    let width = 100;
    timeBar.style.width = width + '%';
    const interval = timeLimit / 100;

    timer = setInterval(() => {
        width--;
        timeBar.style.width = width + '%';

        if (width <= 0) {
            clearInterval(timer);
            alert(`Time\'s up! Game Over. Your score is ${score}`);
            size = 3;
            size = 3;
            level = 30;
            cellSize = 100;
            diff = 6;
            score=0;
            generateGrid(size);
        }
    }, interval);
}
function handleCellClick(isDifferent) {
    clearInterval(timer);
    if (isDifferent) {
        size++;
        if (level > 0) level = level - 1
        else level = 1;
        score ++;
        generateGrid(size);
    } else {
        alert(`Game Over! Your score is ${score}`);

        size = 3;
        size = 3;
        level = 30;
        cellSize = 100;
        diff = 6;
        score=0;
        generateGrid(size);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getSlightlyDifferentColor(baseColor) {
    const colorParts = baseColor.match(/\d+/g).map(Number);
    const r = Math.min(255, colorParts[0] + level);
    const g = Math.min(255, colorParts[1] + level);
    const b = Math.min(255, colorParts[2] + level);
    return `rgb(${r}, ${g}, ${b})`;
}

document.getElementById('btn-start').addEventListener('click', function () {
    generateGrid(size)
    document.getElementById('btn-container').style.display = 'none';
    document.getElementById('time-bar-container').style.display = 'block';

})
