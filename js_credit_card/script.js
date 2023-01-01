const expirationSelect = document.querySelector('[data-expiration-year]');
const currentYear = new Date().getFullYear();
const logo = document.querySelector('[data-logo]');

for (let i = currentYear; i < currentYear + 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    expirationSelect.append(option);
}

document.addEventListener('keydown', e => {
    const input = e.target;
    const key = e.key;
    if (!isConnectedInput(input)) 
        return;

    switch (key) {
        case 'ArrowLeft': {
            if (input.selectionStart === 0 && input.selectionEnd === 0) {
                const prevInput = input.previousElementSibling;
                if (prevInput) {
                    prevInput.focus();
                    prevInput.selectionStart = prevInput.value.length;
                    prevInput.selectionEnd = prevInput.value.length;
                }
                e.preventDefault();
            }
            break;
        }
        case 'ArrowRight': {
            if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
                const nextInput = input.nextElementSibling;
                if (nextInput) {
                    nextInput.focus();
                    nextInput.selectionStart = 1;
                    nextInput.selectionEnd = 1;
                }
                e.preventDefault();
            }
            break;
        }
        case 'Delete': {
            if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
                const nextInput = input.nextElementSibling;
                if (nextInput) {
                    nextInput.value = next.value.substring(1, next.value.length);
                    nextInput.focus();
                    nextInput.selectionStart = 0;
                    nextInput.selectionEnd = 0;
                }
                e.preventDefault();
            }
            break;
        }
        case 'Backspace': {
            if (input.selectionStart === 0 && input.selectionEnd === 0) {
                const prevInput = input.previousElementSibling;
                if (prevInput) {
                    prevInput.value = prevInput.value.substring(0, prevInput.value.length-1);
                    prevInput.focus();
                    prevInput.selectionStart = prevInput.value.length;
                    prevInput.selectionEnd = prevInput.value.length;
                }
                e.preventDefault();
            }
            break;
        }
        default: {
            if (e.ctrlKey || e.altKey) return;
            if (key.length > 1) return;
            if (key.match(/^[^0-9]$/)) return e.preventDefault();

            e.preventDefault();
            onInputChange(input, key);
        }
    }
})

function onInputChange(input, newValue) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    updateInputValue(input, newValue, start, end);
    focusInput(input, start + newValue.length);

    const firstFour = input.closest('[data-connected-inputs]').querySelector('input').value;

    if (firstFour.startsWith('4')) {
        logo.src = 'visa.svg';
    }
    else if (firstFour.startsWith('5')) {
        logo.src = 'mastercard.svg';
    }
}

function updateInputValue(input, value, start = 0, end = 0) {
    const newValue = input.value.substring(0, start) + value + input.value.substring(end, 4);

    input.value = newValue.substring(0, 4);

    if (newValue > 4) {
        const next = input.nextElementSibling;
        if (next === null) return;
        updateInputValue(next, newValue.substring(4));
    }
}

function focusInput(input, dataLength) {
    let addedChars = dataLength;
    let currentInput = input;

    while (addedChars > 4 && currentInput.nextElementSibling !== null) {
        addedChars -= 4;
        currentInput = currentInput.nextElementSibling;
    }

    if (addedChars > 4) addedChars = 4;

    currentInput.focus();
    currentInput.selectionStart = addedChars;
    currentInput.selectionEnd = addedChars;
}

document.addEventListener('paste', e => {
    const input = e.target;
    const data = e.clipboardData.getData('text');

    console.log('Hello');
    if (!isConnectedInput(input)) return;
    if (!data.match(/^[0-9]+$/)) return e.preventDefault();

    e.preventDefault();
    onInputChange(input, data);
})

function isConnectedInput(input) {
    const parent = input.closest('[data-connected-inputs]');
    return input.matches('input') && parent !== null;
}