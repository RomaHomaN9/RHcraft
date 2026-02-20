const render = () => {
    ctx.clearRect(0, 0, CW, CH);

    map.render();
    player.render();
    if (Object.keys(map.blocks)[backpack.block] == "gun") gun.render(player.x, player.y, player.velocity.turn);

    players.render();

    backpack.render();
    aim.render();
};

const move = () => {
    const coef = fps.can * fps.coef;
    player.move(coef);
    player.gravity(coef);
    player.collision();
    player.upload(coef);
    camera.move();
};

let gameStep = 0;

const game = () => {
    if (gameStep * 10 >= fps.can && !menu.isShow) {
        move();
        render();

        gameStep = 0;
    }

    gameStep++;

    // fps.set();
    // console.log(fps.can);

    requestAnimationFrame(game);
};

requestAnimationFrame(game);
