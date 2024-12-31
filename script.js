let countdownInterval;
let remainingTime;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const stopButton = document.getElementById('stop-button');

// timer end sound
const endSound = new Audio('assets/alarm_end.mp3');
endSound.preload = 'auto'

// start the countdown
function startCountdown() {
    const inputTime = document.getElementById('time-input').value;
    const timeUnit = document.getElementById('time-unit').value;

    if (inputTime === '') return;

    if (timeUnit === 'hours') {
        remainingTime = inputTime * 3600
    } else if (timeUnit === 'minutes') {
        remainingTime = inputTime * 60
    } else {
        remainingTime = inputTime
    }

    document.querySelector('.countdown').style.display = 'flex';

    countdownInterval = setInterval(updateCountdown, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
}

function updateCountdown() {
    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        playEnd()
        endCountdown()
    } else {
        remainingTime--;
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        hoursDisplay.textContent = formatTime(hours);
        minutesDisplay.textContent = formatTime(minutes);
        secondsDisplay.textContent = formatTime(seconds);
    }
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


function playEnd() {
    endSound.play().catch(error => {
        console.error('Error playing sound:', error)
    });
}

// popup
function endCountdown() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.color = '#fff';
    popup.style.fontSize = '20px';
    popup.textContent = "Time's up!";
    popup.style.borderRadius = '20px';
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);

    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    stopButton.disabled = true;

    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
}

function pauseCountdown() {
    clearInterval(countdownInterval);
    pauseButton.disabled = true;
    resumeButton.disabled = false;
}

function resumeCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
}

function stopCountdown() {
    clearInterval(countdownInterval);
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    stopButton.disabled = true;
}

startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resumeButton.addEventListener('click', resumeCountdown);
stopButton.addEventListener('click', stopCountdown);