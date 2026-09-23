// ========== Selectores ========== //
const timerCardData = document.querySelector('#timer-card-data');
const secondInput = document.querySelector('#second-input');
const minuteInput = document.querySelector('#minute-input');
const hourInput = document.querySelector('#hour-input');
const timerButton = document.querySelector('#timer-button');
const reloadButton = document.querySelector('#reload-button')

// ========== event listener ========== //
timerButton.addEventListener('click', () => {
    let second = parseInt(secondInput.value) || 0;
    let minute = parseInt(minuteInput.value) || 0;
    let hour = parseInt(hourInput.value) || 0;
    
    const temporizador = setInterval(() => {
        timerCardData.innerHTML = `${hour}:${minute}:${second}`

        hour = (second == 0 && minute == 0 && hour > 0) ? hour - 1 : hour;
        minute = (second !== 0) ? minute : (minute > 0) ? minute - 1 : 59;
        second = (second > 0) ? second - 1 : 59

        if (hour == 0 && minute == 0 && second == 0) {
            clearInterval(temporizador)
            timerCardData.innerHTML = `<img src='./assets/rocket.gif' id='gif-despegue'>`
        }
    }, 1000);

});

reloadButton.addEventListener('click', () => {
    location.reload()
});