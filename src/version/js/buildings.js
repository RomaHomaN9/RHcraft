const house = {
    obj: [],

    create() {
        for (let x = 0; x < 11; x++) {
            this.obj.push([]);
            for (let y = 0; y < 12; y++) {
                this.obj[x].push("air");
            }
        }
        this.generate();
    },

    generate() {
        //floor
        for (let x = 0; x < 11; x++) {
            this.obj[x][11] = "cobblestone";
        }

        //стіни
        for (let y = 5; y < 11; y++) {
            this.obj[1][y] = "tree";
            this.obj[9][y] = "tree";
        }
        this.obj[1][10] = "air";

        //драбина
        for (let y = 6; y < 11; y++) {
            this.obj[8][y] = "ladder";
        }

        //потолок 1
        for (let x = 2; x < 8; x++) {
            this.obj[x][6] = "cobblestone";
        }
        this.obj[2][4] = "cobblestone";
        this.obj[2][5] = "cobblestone";

        //потолок 2
        for (let y = 0; y < 3; y++) {
            for (let x = 5 - y; x <= 5 + y; x++) {
                this.obj[x][y + 1] = "cobblestone";
            }
        }

        //дах
        for (let y = 0; y < 6; y++) {
            this.obj[5 - y][y] = "board";
            this.obj[5 + y][y] = "board";
        }
    },

    set(posX, posY) {
        for (let x = 0; x < 11; x++) {
            for (let y = 0; y < 12; y++) {
                map.map[posX + x][posY + y] = this.obj[x][y];
            }
        }
    },
};
house.create();
house.set(Math.floor(map.width / 2) - 5, 22);
