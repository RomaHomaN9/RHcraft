const $left = document.querySelector("#left");
const $right = document.querySelector("#right");
const $up = document.querySelector("#up");

const $shift = document.querySelector("#shift");

const $setBlock = document.querySelector("#setBlock");

const $menu = document.querySelector("#menu");

$left.addEventListener("touchstart", () => {
    player.velocity.left = true;
    player.velocity.turn = -1;
});
$left.addEventListener("touchend", () => {
    player.velocity.left = false;
});

$right.addEventListener("touchstart", () => {
    player.velocity.right = true;
    player.velocity.turn = 1;
});
$right.addEventListener("touchend", () => {
    player.velocity.right = false;
});

$up.addEventListener("touchstart", () => {
    player.jump(fps.can * fps.coef);
});

$shift.addEventListener("touchstart", () => {
    player.velocity.shift = true;
});
$shift.addEventListener("touchend", () => {
    player.velocity.shift = false;
});

$menu.addEventListener("click", () => {
    menu.set();
});

$setBlock.addEventListener("click", showSelectBlockMenu);

canvas.addEventListener("click", (e) => {
    const posCanvas = canvas.getBoundingClientRect();
    const x = e.clientX - posCanvas.x;
    const y = e.clientY - posCanvas.y;

    player.setBlock(x, y, Object.keys(map.blocks)[backpack.block]);
});

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const posCanvas = canvas.getBoundingClientRect();
    const x = e.clientX - posCanvas.x;
    const y = e.clientY - posCanvas.y;

    player.setBlock(x, y, "air");
});

window.addEventListener("resize", () => {
    resizeCanvas();
});
