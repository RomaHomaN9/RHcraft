const gun = {
    width: 0.626,
    height: 0.39,

    texture: {
        right: new Image(),
        left: new Image(),
    },

    render(posX, posY, turn) {
        let x = (posX + player.width) * block;
        let y = (posY + player.height / 3) * block;

        let sprite;
        if (turn == 1) {
            sprite = "right";
        } else {
            sprite = "left";
            x -= (this.width + player.width) * block;
        }

        drawImage(this.texture[sprite], x, y, this.width * block, this.height * block);
    },

    async setTextures() {
        this.texture.right.src = "../textures/gunRight.png";
        this.texture.left.src = "../textures/gunLeft.png";
    },
};
gun.setTextures();
