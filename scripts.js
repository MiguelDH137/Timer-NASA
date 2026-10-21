// ========== VARIABLES GLOBALES ========== //
// selectores
const form = document.querySelector('#container-timer-input')
const timerCardData = document.querySelector('#timer-card-data');
const secondInput = document.querySelector('#second-input');
const minuteInput = document.querySelector('#minute-input');
const hourInput = document.querySelector('#hour-input');
const timerButton = document.querySelector('#timer-button');
const reloadButton = document.querySelector('#reload-button')
// RegEx
const REGEXHOUR = /^([0-9]|1[0-9]|2[0-4])$/;
const REGEXSECMIN = /^([0-9]|[1-5][0-9])$/;
// variables
let intervaloId = null;
let fechaObjetivo = null;
const sonidoAlarma = new Audio('./assets/alarma.mp3');
sonidoAlarma.loop = true;

// ========== FUNCIONES ========== //
function actualizarTemporizador() {
    const ahora = new Date();

    // Diferencia de ms mediante resta de obj Date
    const diferenciaMs = fechaObjetivo.getTime() - ahora.getTime();

    // Validacion si la diferencia llega a "0"
    if (diferenciaMs <= 0) {
        clearInterval(intervaloId);
        intervaloId = null;
        timerCardData.innerHTML = `<img src='./assets/rocket.gif' id='gif-despegue'>`
        activarAlarma();
        return
    }

    // Convertir ms restantes a h, m y s
    const totalS = Math.floor(diferenciaMs / 1000);
    const horas = Math.floor(totalS / 3600);
    const minutos = Math.floor((totalS % 3600) / 60);
    const segundos = totalS % 60;

    // formato de 2 digitos
    const formato = [
        String(horas).padStart(2, '0'),
        String(minutos).padStart(2, '0'),
        String(segundos).padStart(2, '0')
    ].join(":");
    timerCardData.textContent = formato;
};

function activarAlarma() {
    sonidoAlarma.currentTime = 0;
    sonidoAlarma.play().catch(error => {console.error(`Error al reproducir la alarma: ${error}`)})
};

function detenerAlarma() {
    sonidoAlarma.pause();
};

// ========== event listener ========== //
form.addEventListener('submit', (e) => {
    // Evita que la pagina se reinicie.
    e.preventDefault();

    // Se obtiene el valor de los inputs
    let s = parseInt(secondInput.value) || 0;
    let m = parseInt(minuteInput.value) || 0;
    let h = parseInt(hourInput.value) || 0;

    // conversion a ms
    const totalMs = (h * 3600 + m * 60 + s) * 1000;

    if (totalMs <= 0) {
        timerCardData.innerHTML = `<p>El tiempo ingresado es invalido</p>`
        return;
    }

    // Se valida si el tipo y monto es correcto con regex
    if (!REGEXHOUR.test(h) || !REGEXSECMIN.test(m) || !REGEXSECMIN.test(s)) {
        timerCardData.innerHTML = `<p>La Cantidad de tiempo ingresado es invalido</p>`
        return;
    }

    // Se establece el tiempo objetivo y se suma los milisegundos al tiempo actual.
    const ahora = new Date();
    fechaObjetivo = new Date(ahora.getTime() + totalMs);

    // validacion redundante para limpiar el temporizador si ya hay uno corriendo
    if (intervaloId) { clearInterval(intervaloId)};
    
    // Ejecutar primer actualizacion visual
    actualizarTemporizador();

    // Intervalo para validar la diferencia de ms cada 500ms
    intervaloId = setInterval(actualizarTemporizador, 500);
});

reloadButton.addEventListener('click', () => {
    location.reload()
});