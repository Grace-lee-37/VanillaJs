const body = document.querySelector("body")
const IMG_NUM = 3;

function generateImg(){
    const generateNum = Math.floor(Math.random() * IMG_NUM)
    const image = new Image;
    image.src = `${generateNum + 1}.jpg`
    image.classList.add("bgImg")
    body.appendChild(image)

}

generateImg();