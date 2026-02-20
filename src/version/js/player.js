const player = {
    x: map.width / 2,
    y: map.height - 6,
    width: 0.8, // width<1
    height: 0.8, // height<1

    texture: {
        idleLeft: new Image(),
        idleRight: new Image(),
        jumpLeft: new Image(),
        jumpRight: new Image(),
    },

    sprite: "idleLeft",

    speed: 800,
    shift: 750,
    jumpSpeed: -750,

    velocity: {
        left: false,
        right: false,

        shift: false,

        canJump: false,
        doubleJump: true,

        turn: 1,
    },

    gVelocity: 0,

    point: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        topD: 0,
        leftD: 0,
        bottomD: 0,
        rightD: 0,
        coef: 0.2,

        reset() {
            this.top = Math.floor(player.y);
            this.left = Math.floor(player.x);
            this.bottom = Math.floor(player.y + player.height);
            this.right = Math.floor(player.x + player.width);

            this.topD = Math.floor(player.y + this.coef);
            this.leftD = Math.floor(player.x + this.coef);
            this.bottomD = Math.floor(player.y + player.height - this.coef);
            this.rightD = Math.floor(player.x + player.width - this.coef);
        },
    },

    multiplayer: {
        oldX: 0,
        oldY: 0,
        timer: 0,
        oldMove: false,
    },

    render() {
        const x = this.x * block;
        const y = this.y * block;
        const width = this.width * block;
        const height = this.height * block;

        if (this.velocity.canJump) {
            if (this.velocity.turn == 1) this.sprite = "idleRight";
            else this.sprite = "idleLeft";
        } else {
            if (this.velocity.turn == 1) this.sprite = "jumpRight";
            else this.sprite = "jumpLeft";
        }

        drawImage(this.texture[this.sprite], x, y, width, height);
    },

    gravity(coef) {
        this.gVelocity += gravitySpeed * coef;
        this.y += this.gVelocity;
        this.velocity.canJump = false;
    },

    move(coef) {
        const num = (this.velocity.right - this.velocity.left) * this.speed * coef;
        const shift = (this.velocity.right - this.velocity.left) * this.shift * coef * this.velocity.shift;
        this.x += num - shift;
    },

    jump(coef) {
        if (this.velocity.canJump) this.gVelocity = this.jumpSpeed * coef;
        else if (this.velocity.doubleJump) {
            this.gVelocity = this.jumpSpeed * coef;
            this.velocity.doubleJump = false;
        }
    },

    collision() {
        this.point.reset();

        let isBottom = false;
        let isTop = false;

        for (let i = 0; i < Object.keys(map.blocks).length; i++) {
            const block = Object.keys(map.blocks)[i];

            if (map.blocksCategory.isReturn(false, "notCollision", block)) continue;

            //bottom
            if (
                (map.map[this.point.left][this.point.bottom] == block &&
                    map.map[this.point.leftD][this.point.bottom] == block) ||
                (map.map[this.point.right][this.point.bottom] == block &&
                    map.map[this.point.rightD][this.point.bottom] == block)
            ) {
                if (block != "ladder") {
                    this.y = this.point.bottom - this.height;
                    this.gVelocity = 0;
                    this.point.reset();

                    isBottom = true;
                }
                this.velocity.canJump = true;
                this.velocity.doubleJump = true;
            }

            //top
            if (
                //prettier-ignore
                (map.map[this.point.left][this.point.top] == block &&
                    map.map[this.point.leftD][this.point.top] == block) ||
                (map.map[this.point.right][this.point.top] == block &&
                    map.map[this.point.rightD][this.point.top] == block)
            ) {
                if (block != "ladder") {
                    this.y = this.point.top + 1;
                    if (this.gVelocity < 0) this.gVelocity = 0;
                    this.point.reset();

                    isTop = true;
                }
            }

            //left
            if (
                //prettier-ignore
                (map.map[this.point.left][this.point.top] == block &&
                    map.map[this.point.left][this.point.topD] == block) ||
                (map.map[this.point.left][this.point.bottom] == block &&
                    map.map[this.point.left][this.point.bottomD] == block)
            ) {
                if (block != "ladder") {
                    this.x = this.point.left + 1;
                    this.point.reset();
                }
            }

            //right
            if (
                (map.map[this.point.right][this.point.top] == block &&
                    map.map[this.point.right][this.point.topD] == block) ||
                (map.map[this.point.right][this.point.bottom] == block &&
                    map.map[this.point.right][this.point.bottomD] == block)
            ) {
                if (block != "ladder") {
                    this.x = this.point.right - this.width;
                    this.point.reset();
                }
            }
        }

        if (isBottom && isTop) this.y--;
    },

    setBlock(x, y, block) {
        if (block == "gun") {
            const allPlayers = Object.values(players.all);

            let turn = this.velocity.turn;

            for (let posX = 0; posX * turn <= 10; posX += turn) {
                const blockX = Math.floor(this.x + posX);
                const blockY = Math.floor(this.y + this.height / 2);

                const blockOnPush = map.map[blockX][blockY];

                if (blockOnPush == "tnt") {
                    map.map[blockX][blockY] = "tntBang";
                    this.setBlockOnServer(blockX, blockY, "tntBang");

                    setTimeout(() => this.tntBang(blockX, blockY), 2000);
                    socket.emit("tntBang", {
                        roomCode: roomCode,

                        x: blockX,
                        y: blockY,
                    });

                    return;
                }

                if (map.blocksCategory.isReturn(true, "notCollision", blockOnPush)) return;

                for (let i = 0; i < allPlayers.length; i++) {
                    const thisPl = allPlayers[i];

                    if (
                        this.x + posX >= thisPl.x &&
                        this.x + posX <= thisPl.x + this.width &&
                        this.y + this.height / 2 >= thisPl.y &&
                        this.y + this.height / 2 <= thisPl.y + this.height
                    ) {
                        socket.emit(`diePl`, {
                            roomCode: roomCode,
                            index: Object.keys(players.all)[i],
                        });
                        return;
                    }
                }
            }

            return;
        }

        let setX = this.x + this.width / 2;
        let setY = this.y + this.height / 2;

        if (x < aim.partX) setX = this.x - 1;
        else if (x > aim.partX * 2) {
            setX = this.x + this.width + 1;
            if (setX % 1 == 0) setX--;
        } else {
            if (y < aim.centerY) setY = this.y - 1;
            else {
                setY = this.y + this.height;
                this.gVelocity ? (setY += 1) : null;
            }
        }

        setX = Math.floor(setX);
        setY = Math.floor(setY);

        if (setY < 0) return;
        if (setY > map.height) return;

        if (map.blocksCategory.isReturn(false, "cannotBreak", map.map[setX][setY])) return;
        if (map.map[setX][setY] != "air" && block != "air") return;

        this.setBlockOnServer(setX, setY, block);

        // якщо нижній блок це трава

        if (setY + 1 > map.height) return;

        if (map.map[setX][setY - 1] != "air" && block == "grass") {
            this.setBlockOnServer(setX, setY, "dirt");
        }

        if (map.map[setX][setY + 1] == "grass") {
            this.setBlockOnServer(setX, setY + 1, "dirt");
        }
    },

    tntBang(inputX, inputY) {
        for (let x = inputX - 2; x <= inputX + 2; x++) {
            for (let y = inputY - 2; y <= inputY + 2; y++) {
                if ((x - inputX) * (x - inputX) + (y - inputY) * (y - inputY) >= 8) {
                    continue;
                }

                if (map.blocksCategory.isReturn(false, "cannotBreakTnt", map.map[x][y])) continue;
                else if (map.map[x][y] == "tnt") {
                    map.map[x][y] = "tntBang";
                    setTimeout(() => this.tntBang(x, y), 100);
                    continue;
                }

                map.map[x][y] = "air";
            }
        }
    },

    async setTexture() {
        this.texture.idleLeft.src = "../textures/player/idle left.png";
        this.texture.idleRight.src = "../textures/player/idle right.png";
        this.texture.jumpLeft.src = "../textures/player/jump left.png";
        this.texture.jumpRight.src = "../textures/player/jump right.png";
    },

    upload() {
        if (
            this.x != this.multiplayer.oldX ||
            this.y != this.multiplayer.oldY ||
            this.multiplayer.timer >= 1000 ||
            this.multiplayer.oldMove
        ) {
            socket.emit(`setPl`, {
                roomCode: roomCode,

                index: playerName,

                time: new Date().getUTCSeconds(),

                x: this.x,
                y: this.y,

                sprite: this.sprite,
                block: backpack.block,
            });

            this.multiplayer.timer = 0;
            this.multiplayer.oldMove = true;
        } else if (this.multiplayer.oldMove) {
            if (this.multiplayer.oldMove) {
                this.multiplayer.oldMove = false;
                console.log(1);
            } else {
                this.multiplayer.oldMove = true;
            }
        }

        this.multiplayer.oldX = this.x;
        this.multiplayer.oldY = this.y;

        this.multiplayer.timer += 50;
    },

    setBlockOnServer(x, y, block) {
        socket.emit(`setMap`, {
            roomCode: roomCode,
            x: x,
            y: y,
            block: block,
        });

        map.set(x, y, block);
    },
};

player.setTexture();
