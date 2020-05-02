const CLOCK_CONTAINER = document.querySelector(".js-clock");
const CLOCK = CLOCK_CONTAINER.querySelector("h1");
const DATE_CONTAINER = document.querySelector(".js-date");
const DATE = DATE_CONTAINER.querySelector("h3");

function paintTime() {
    const TIME = new Date();
    CLOCK.innerHTML = 
    `${TIME.getHours()} : ${TIME.getMinutes() < 10 ? `0${TIME.getMinutes()}` : TIME.getMinutes()} : ${TIME.getSeconds() < 10 ? `0${TIME.getSeconds()}` : TIME.getSeconds()}`;
    DATE.innerHTML = `${TIME.getFullYear()} . ${TIME.getMonth()+1} . ${TIME.getDate()}`;
       
}

setInterval(paintTime,1000);