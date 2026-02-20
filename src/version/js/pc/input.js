document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "KeyA":
            player.velocity.left = true;
            player.velocity.turn = -1;
            break;
        case "KeyD":
            player.velocity.right = true;
            player.velocity.turn = 1;
            break;
        case "Space":
            player.jump(fps.can * fps.coef);
            break;
        case "ShiftLeft":
            player.velocity.shift = true;
            break;
        case "Escape":
            menu.set();
            break;
        default:
            console.log(e.code);
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "KeyA":
            player.velocity.left = false;
            break;
        case "KeyD":
            player.velocity.right = false;
            break;
        case "ShiftLeft":
            player.velocity.shift = false;
            break;
        default:
    }
});

canvas.addEventListener("click", (e) => {
    const posCanvas = canvas.getBoundingClientRect();
    const x = e.clientX - posCanvas.x;
    const y = e.clientY - posCanvas.y;

    player.setBlock(x, y, "air");
});

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const posCanvas = canvas.getBoundingClientRect();
    const x = e.clientX - posCanvas.x;
    const y = e.clientY - posCanvas.y;

    player.setBlock(x, y, Object.keys(map.blocks)[backpack.block]);
});

document.addEventListener("mousedown", function (e) {
    if (e.button == 1) {
        showSelectBlockMenu();
    }
});

window.addEventListener("resize", () => {
    resizeCanvas();
});
