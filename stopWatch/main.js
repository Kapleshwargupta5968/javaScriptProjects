const display = document.querySelector('.time');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const stopBtn = document.querySelector("#stopBtn");
const lapBtn = document.querySelector("#lapBtn");
const lapItems = document.querySelector("#list");
let hours = 0;
let minutes = 0;
let seconds = 0;

let isRunning = false;
let timer = null;
let lapCount = 0;
//Start Watch

function startWatch() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 1000);
    }
}
//Stop Watch

function stopWatch() {
    clearInterval(timer);
    isRunning = false;
}

//Reset Watch

function resetWatch() {
    clearInterval(timer);
    isRunning = false;

    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 0;
    display.innerText = "00:00:00"
    lapItems.innerText = " ";
}
//lap time
function lapTime(){
    if(!isRunning) return

    lapCount++;
    const lapTime = display.innerText;
    const lapList = document.createElement("li");

    lapList.innerText = `Lap ${lapCount}-${lapTime}`
    lapItems.appendChild(lapList);
    if (lapList.scrollIntoView) {
        lapList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        lapItems.scrollTop = lapItems.scrollHeight;
    }
    
}
//update time
function updateTime() {
    seconds += 1;
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }
    display.innerText = `${String(hours).padStart(2, "0")}:` + `${String(minutes).padStart(2, "0")}:` + `${String(seconds).padStart(2, "0")}`;
}


startBtn.addEventListener('click', startWatch);
stopBtn.addEventListener('click', stopWatch);
resetBtn.addEventListener('click', resetWatch);
lapBtn.addEventListener('click', lapTime);
