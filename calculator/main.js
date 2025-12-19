const display = document.querySelector('#display');
const historyEl = document.querySelector('#history');
const keys = document.querySelector('.keys');
let expression = '';

function sanitizeForEval(expr) {
    return expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
}

function updateDisplay() {
    display.value = expression || '0';
    historyEl.textContent = '';
}

function calculate() {
    if (!expression) return;
    try {
        const sanitized = sanitizeForEval(expression).replace(/%/g, '/100');

        // eslint-disable-next-line no-eval
        const result = eval(sanitized);
        historyEl.textContent = expression + ' =';
        expression = String(result);
        updateDisplay();
    } catch (err) {
        display.value = 'Error';
        expression = '';
    }
}

keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const val = btn.dataset.value;

    if (val === 'AC') {
        expression = '';
        updateDisplay();
        return;
    }

    if (val === 'C') {
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
    }

    if (val === '=') {
        calculate();
        return;
    }

    // Append numbers/operators
    expression += val;
    updateDisplay();
});

// Key Support
window.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((/\d/).test(key)) {
        expression += key; updateDisplay(); return;
    }
    if (key === 'Enter') {
        e.preventDefault(); calculate(); return;
    }
    if (key === 'Backspace') {
        expression = expression.slice(0, -1); updateDisplay(); return;
    }
    if (key === 'Escape') {
        expression = ''; updateDisplay(); return;
    }
    if (key === '.') {
        expression += '.'; updateDisplay(); return;
    }
    if (key === '/' || key === '*') {
        expression += key; updateDisplay(); return;
    }
    if (key === '+' || key === '-') {
        expression += key; updateDisplay(); return;
    }
});

updateDisplay();
