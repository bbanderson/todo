const TIME = document.querySelector(".js-clock h1")
const GREET = document.querySelector(".js-greeting").querySelector("h2")
const NAME_CHANGE_BTN = document.querySelector(".js-greeting button")
const NAME_CONTAINER = document.querySelector(".js-name");
const FORM = NAME_CONTAINER.querySelector("form");
const INPUT = NAME_CONTAINER.querySelector("input");
const NAME_STORAGE = "name";

function setName() {
    localStorage.setItem(NAME_STORAGE, INPUT.value)
    greet(INPUT.value)
    INPUT.value = ""
}

function handleSubmit(e) {
    e.preventDefault()
    setName()
}

function handleChangeName(e) {
    localStorage.removeItem(NAME_STORAGE);
    NAME_CONTAINER.classList.remove("hide");
    NAME_CHANGE_BTN.classList.add("hide")
    GREET.classList.add("hide");
    location.reload()
}

function greet(name) {
    GREET.innerHTML = `Hello, ${name}!`
    NAME_CONTAINER.classList.add("hide");
    NAME_CHANGE_BTN.classList.remove("hide")
}

function loadData() {
    const data = localStorage.getItem(NAME_STORAGE);
    if (data !== null) {
        greet(data);
    } else {
        
        NAME_CHANGE_BTN.classList.add("hide")
    }
}

loadData();

FORM.addEventListener("submit", handleSubmit)
NAME_CHANGE_BTN.addEventListener("click", handleChangeName)
