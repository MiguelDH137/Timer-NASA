// ========== Selectores ========== //
const timerCardData = document.querySelector('#timer-card-data');
const timerInput = document.querySelector('#timer-input');
const timerButton = document.querySelector('#timer-button');

// ========== event listener ========== //
timerButton.addEventListener('click', () => {
    let time = timerInput.value;
    
    const temporizador = setInterval(() => {
        timerCardData.innerHTML = `${time}`
        time --;

        if (time == -1) {
            clearInterval(temporizador)
            timerCardData.textContent = `DESPEGUE`
        }
    }, 1000);

});