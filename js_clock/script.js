const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

setInterval(setClock, 1000);

function setClock() {
    const currentDate = new Date();
    const secondPercentage = currentDate.getSeconds() / 60;
    const minutePercentage = (secondPercentage + currentDate.getMinutes()) / 60;
    const hourPercentage = (minutePercentage + currentDate.getHours()) / 12;

    setRotation(secondHand, secondPercentage);
    setRotation(minuteHand, minutePercentage);
    setRotation(hourHand, hourPercentage);
}

function setRotation(element, rotationPercentage) {
    element.style.setProperty('--rotation', rotationPercentage * 360);
}

setClock(); // This is just a one-time call so that we can start seeing Clock UI motion from the current time itself as starting time.