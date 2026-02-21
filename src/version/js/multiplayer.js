const socket = io();

let roomCode = prompt("Room code is:");
while (!roomCode) {
    roomCode = prompt("Room code is:");
}

let playerName = prompt("Your name is:");
while (!playerName) {
    playerName = prompt("Your name is:");
}

socket.emit("joinRoom", {
    roomCode: roomCode,
    name: playerName,
});

const players = {
    all: {},

    standardRender(pl) {
        drawImage(player.texture[pl.sprite], pl.x * block, pl.y * block, player.width * block, player.height * block);
    },

    render() {
        const currentSecond = new Date().getUTCSeconds();

        for (let i = 0; i < Object.keys(this.all).length; i++) {
            const thisPlayer = Object.values(this.all)[i];

            if (!thisPlayer) continue;

            if (currentSecond - thisPlayer.time > 3) {
                this.all[Object.keys(this.all)[i]] = null;
                continue;
            }

            this.standardRender(thisPlayer);

            ctx.font = `${block * 0.3}px Consolas, Bold`;
            ctx.fillStyle = "#000000";

            let text = Object.keys(this.all)[i];

            ctx.fillText(text, thisPlayer.x * block + camera.x, thisPlayer.y * block + camera.y);

            if (Object.keys(map.blocks)[thisPlayer.block] == "gun") {
                const turn = thisPlayer.sprite[4] == "R" ? 1 : -1;
                gun.render(thisPlayer.x, thisPlayer.y, turn);
            }
        }
    },
};

socket.on(`allPlayerOfRoom`, (data) => {
    players.all[data.index] = {
        x: data.x,
        y: data.y,

        sprite: data.sprite,
        block: data.block,

        time: data.time,
    };
});

socket.on(`diePl`, (data) => {
    if (data.index != playerName) return;

    player.x = map.width / 2;
    player.y = map.height - 6;
});

socket.on(`setMap`, (data) => {
    map.set(data.x, data.y, data.block);
});

socket.on(`tntBang`, (data) => {
    setTimeout(() => player.tntBang(data.x, data.y), 2000);
});

socket.on("getMap", ({ targetId }) => {
    const currentMap = menu.export(true, true);

    socket.emit("sendStateToTarget", {
        targetId: targetId,
        mapData: currentMap,
    });
});

socket.on("receiveMap", (receiveMap) => {
    const getMap = JSON.parse(receiveMap);

    const id = Object.keys(map.blocks);

    for (let x = 0; x <= map.width; x++) {
        for (let y = 0; y <= map.height; y++) {
            map.map[x][y] = id[getMap.map[x][y]];
        }
    }
});

socket.on("error", (message) => {
    alert(message);
    window.location.reload();
});
