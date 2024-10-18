
let startTime, intervalId;
let elapsedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopStopwatch() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startButton.disabled = false;
    stopButton.disabled = true;
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);

stopButton.disabled = true;
