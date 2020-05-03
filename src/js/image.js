const CHANGE_IMG_BTN = document.querySelector(".js-change-img button")
const CURRENT_IMG_CATEGORY = document.querySelector(".js-change-img span")

const USER_IMG_STORAGE = "image_category"

function save(text) {
    localStorage.setItem(USER_IMG_STORAGE, text);
}

function handleImg() {
    const preference = prompt("Background Image Configuration! Which Category do you want to choose?", "landscape");
    if (preference !== null) {
        save(preference);
        getImage(preference);
    }
    location.reload();
}

function getImage(imgCategory) {
    const IMG_SRC = `https://pixabay.com/api/?key=16348363-5f62afc96e1c40cb93593dede&q=${imgCategory}&image_type=photo`
    CURRENT_IMG_CATEGORY.innerHTML = `${imgCategory}`
    console.log(imgCategory)
    fetch(IMG_SRC).then(response => {
        response.json().then(result => {
            const source = result.hits[Math.floor(Math.random()*(result.hits.length))].largeImageURL
            const IMG = new Image();
            IMG.src = `${source}`;
            IMG.alt = "background-image";
            document.querySelector("body").prepend(IMG);
        })
    })
}

function loadUserImgCategory() {
    const data = localStorage.getItem(USER_IMG_STORAGE);
    if (data !== null) {
        getImage(data)
    } else {
        getImage("landscape")
    }
}

CHANGE_IMG_BTN.addEventListener("click", handleImg)

loadUserImgCategory();