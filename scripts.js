// ========== Selectores ========== //
const timerCardData = document.querySelector('#timer-card-data');
const secondInput = document.querySelector('#second-input');
const minuteInput = document.querySelector('#minute-input');
const hourInput = document.querySelector('#hour-input');
const timerButton = document.querySelector('#timer-button');

// ========== event listener ========== //
timerButton.addEventListener('click', () => {
    let second = secondInput.value || 0;
    let minute = minuteInput.value || 0;
    let hour = hourInput.value || 0;
    
    const temporizador = setInterval(() => {
        timerCardData.innerHTML = `${hour}:${minute}:${second}`

        hour = (second == 0 && minute == 0) ? hour - 1 : hour;
        minute = (second !== 0) ? minute : (minute > 0) ? minute - 1 : 59;
        second = (second > 0) ? second - 1 : 59

        if (hour == 0 && minute == 0 && second == 0) {
            clearInterval(temporizador)
            timerCardData.innerHTML = `DESPEGUE`
        }
    }, 1000);

});