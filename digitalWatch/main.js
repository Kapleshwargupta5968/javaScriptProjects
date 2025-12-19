const display = document.querySelector('#time');
const dateEl = document.querySelector('#date');

function format12Hour(h){
    const h12 = h % 12 || 12; // convert 0 -> 12
    return String(h12).padStart(2,'0');
}

function updateDisplay(){
    const now = new Date();
    const hh = now.getHours();
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    const ampm = hh >= 12 ? 'PM' : 'AM';

    display.textContent = `${format12Hour(hh)}:${mm}:${ss} ${ampm}`;

    // optional date line, e.g. "Fri, 19 Dec 2025"
    const opts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString(undefined, opts);

    // Update every second, align to real clock boundary
    const msToNextSecond = 1000 - now.getMilliseconds();
    setTimeout(updateDisplay, msToNextSecond);
}

updateDisplay();