const map = {
    map: [],

    width: 999, // +1
    height: 39, // +1

    threeD: 10,

    blocks: {
        grass: new Image(),
        dirt: new Image(),
        stone: new Image(),
        cobblestone: new Image(),

        board: new Image(),
        tree: new Image(),
        leaf: new Image(),
        ladder: new Image(),

        glass: new Image(),
        brick: new Image(),

        tnt: new Image(),

        gun: new Image(),

        air: new Image(),
        bedrock: new Image(),
        barrier: new Image(),

        tntBang: new Image(),
    },

    set(x, y, block) {
        this.map[x][y] = block;
    },

    create() {
        for (let x = 0; x <= this.width; x++) {
            this.map.push([]);
            for (let y = 0; y <= this.height; y++) {
                this.map[x].push("air");
            }
        }
    },

    render() {
        for (let x = 0; x <= this.width; x++) {
            for (let y = 0; y <= this.height; y++) {
                if (this.map[x][y] == "air") continue;
                if (this.map[x][y] == "tntBang") {
                    const time = new Date().getMilliseconds();
                    if (time < 500) drawImage(this.blocks.tntBang, x * block, y * block, block, block);
                    else drawImage(this.blocks.tnt, x * block, y * block, block, block);
                    continue;
                }

                drawImage(this.blocks[this.map[x][y]], x * block, y * block, block, block);
            }
        }
    },

    generate() {
        for (let x = 0; x <= this.width; x++) {
            let y = 1;

            this.set(x, this.height, "bedrock");

            for (y; y < 4; y++) {
                this.set(x, this.height - y, "stone");
            }
            for (y; y <= 5; y++) {
                this.set(x, this.height - y, "dirt");
            }
            for (y; y <= 6; y++) {
                this.set(x, this.height - y, "grass");
            }
        }

        for (let y = 0; y <= this.height; y++) {
            this.set(0, y, "barrier");
            this.set(this.width, y, "barrier");
        }
    },
};

const loadTexture = async () => {
    const [blocks, textures] = [
        Object.keys(map.blocks),
        () => {
            let texture = [];
            for (let i = 0; i < blocks.length; i++) {
                texture.push(`../textures/${blocks[i]}.png`);
            }
            return texture;
        },
    ];

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] == "air") continue;
        if (blocks[i] == "gun") {
            map.blocks[blocks[i]].src = "../textures/gunRight.png";
            continue;
        }

        map.blocks[blocks[i]].src = textures()[i];
    }
};

loadTexture();

map.create();
map.generate();
