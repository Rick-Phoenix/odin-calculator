const buttons = document.querySelectorAll('button');
let currentButton = null;

buttons.forEach((button) => {
    button.addEventListener('mousedown', (e) => {
        currentButton = e.target;
        currentButton.classList.add('btn-down');
    });

    document.addEventListener('mouseup', () => {
        if (currentButton) {
            currentButton.classList.remove('btn-down');
            currentButton = null;
        }
    });
});