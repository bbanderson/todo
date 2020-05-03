const API_KEY = "2ddad7f301e34d29f302e40dd892bc4a";
const COORDS = "coords";

function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(response => {
        response.json().then(result => {
            console.log(result)
        })
    })
}

function saveCoords(obj) {
    localStorage.setItem(COORDS, JSON.stringify(obj))
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    console.log(lat, lon)
    const coordsObj = {
        lat,
        lon
    }
    saveCoords(coordsObj)
    fetchWeather(lat, lon)
}

function handleError() {
    console.log("Can't access geo location.")
}

function setCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleError)
}

function getCoords(obj) {
    fetchWeather(obj.lat, obj.lon)
}

function loadData() {
    const data = localStorage.getItem(COORDS);
    if (data !== null) {
        const parseData = JSON.parse(data)
        getCoords(parseData);
    } else {
        setCoords();
    }
}

loadData();