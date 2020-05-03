const CLOCK_CONTAINER = document.querySelector(".js-clock");
const CLOCK = CLOCK_CONTAINER.querySelector("h1");
const DATE_CONTAINER = document.querySelector(".js-date");
const DATE = DATE_CONTAINER.querySelector("h3");

function paintTime() {
    const TIME = new Date();
    const HOURS = TIME.getHours()
    const MIN = TIME.getMinutes()
    const SEC = TIME.getSeconds()
    const YEAR = TIME.getFullYear()
    const MONTH = TIME.getMonth()
    const DAY = TIME.getDate()
    

    if (SEC >= 50) { CLOCK.classList.add("red") } else { CLOCK.classList.remove("red") }
   
    
    CLOCK.innerHTML = 
    `${HOURS < 10 ? `0${HOURS}` : HOURS} : ${MIN < 10 ? `0${MIN}` : MIN} : ${SEC < 10 ? `0${SEC}` : SEC}`;
    DATE.innerHTML = `${YEAR} . ${MONTH + 1} . ${DAY}`;
}

setInterval(paintTime,1000);