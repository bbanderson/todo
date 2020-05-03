const image_count = 3;

function loadImage() {
    const IMG = new Image()
    IMG.src = `./src/images/${Math.floor(Math.random() * image_count) + 1}.jpg`
    console.log(IMG)
    document.querySelector("body").prepend(IMG)
}

loadImage()