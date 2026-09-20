// ========== Selectores ========== //
const timerCardData = document.querySelector('#timer-card-data').innerHTML = `00:00`;
const timerInput = document.querySelector('#timer-input');
const timerButton = document.querySelector('#timer-button');

// ========== event listener ========== //
timerButton.addEventListener('click', () => {
    const timerInputValue = timerInput.value;
    console.log(timerInputValue)
});