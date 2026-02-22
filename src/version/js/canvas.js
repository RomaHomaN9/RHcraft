const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let CW;
let CH;
let block;

function resizeCanvas() {
    const ratio = 7 / 5; // 1.4
    let scale;

    // width>height
    let width = window.innerWidth;
    let height = width / ratio;

    // height>width
    if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height * ratio;
    }

    scale = width / 700;

    CW = canvas.width = 700 * scale;
    CH = canvas.height = 500 * scale;
    ctx.imageSmoothingEnabled = false;

    block = 50 * scale;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (typeof aim !== "undefined") {
        aim.reset();
    }
}
resizeCanvas();

const drawImage = (img, x, y, width, height) => {
    const posX = x + camera.x;
    const posY = y + camera.y;

    if (posX + width < 0) return;
    if (posX > CW) return;
    if (y + height + camera.y < 0) return;
    if (posY > CH) return;

    ctx.drawImage(img, posX, posY, width, height);
};

const fps = {
    can: 20, //in ms

    coef: 0.00001,
};

const gravitySpeed = 40;
