let startTime, intervalId;
let elapsedTime = 0;
const laps = []; // Array to store lap times

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const themeToggle = document.getElementById('themeToggle');

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
    lapButton.disabled = false; // Enable lap button when stopwatch starts
}

function stopStopwatch() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true; // Disable lap button when stopwatch stops
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.length = 0; // Clear the laps array
    lapsContainer.innerHTML = ""; // Clear the laps display
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true; // Disable lap button when reset
}

function recordLap() {
    const lapTime = formatTime(elapsedTime); // Get current elapsed time
    laps.push(lapTime); // Store the lap time
    const lapElement = document.createElement('div'); // Create a new div for the lap
    lapElement.textContent = `Lap ${laps.length}: ${lapTime}`; // Set the lap text
    lapsContainer.appendChild(lapElement); // Add the lap to the container
}

// Theme toggle functionality
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.setAttribute('data-theme', 'dark'); // Set dark theme
    } else {
        document.body.removeAttribute('data-theme'); // Set light theme
    }
});

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap); // Add event listener for lap button

// Initial button states
stopButton.disabled = true;
lapButton.disabled = true; // Disable lap button initially
