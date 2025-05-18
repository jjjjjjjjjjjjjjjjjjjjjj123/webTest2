// Get the input fields and button
const input1 = document.getElementById('wsUrl');
const input2 = document.getElementById('nameInput');
const button = document.getElementById('connectBtn');

// Function to check if both inputs have text
function checkInputs() {
    if (input1.value && input2.value) {
        button.style.filter = 'brightness(100%)'; // Set brightness to 100%
        button.disabled = false; // Enable button
    } else {
        button.style.filter = 'brightness(50%)'; // Set brightness to 50% (or any other value)
        button.disabled = true; // Enable button
    }
}

// Listen for input changes
input1.addEventListener('input', checkInputs);
input2.addEventListener('input', checkInputs);
