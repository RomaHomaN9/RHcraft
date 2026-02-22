setTimeout(() => {
    const posX = Math.floor(map.width / 2);

    //підлога
    for (let x = posX - 5; x < posX + 6; x++) {
        map.map[x][33] = "cobblestone";
    }

    //стіни
    for (let y = 27; y < 33; y++) {
        map.map[posX - 4][y] = "tree";
        map.map[posX + 4][y] = "tree";
    }
    console.log(posX);
    map.map[posX - 4][32] = "air";

    //драбина
    for (let y = 28; y < 33; y++) {
        map.map[posX + 3][y] = "ladder";
    }

    //стеля 1
    for (let x = posX - 3; x < posX + 3; x++) {
        map.map[x][28] = "cobblestone";
    }
    map.map[posX - 3][26] = "cobblestone";
    map.map[posX - 3][27] = "cobblestone";

    //стеля 2
    for (let y = 22; y < 25; y++) {
        for (let x = 22 - y; x <= y - 22; x++) {
            map.map[posX + x][y + 1] = "cobblestone";
        }
    }

    //дах
    for (let y = 22; y < 28; y++) {
        map.map[posX + 22 - y][y] = "board";
        map.map[posX + y - 22][y] = "board";
    }
}, 0);
