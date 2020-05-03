const IMG_SRC = "https://pixabay.com/api/?key=16348363-5f62afc96e1c40cb93593dede&q=landscape&image_type=photo"

function getImage() {
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

getImage();