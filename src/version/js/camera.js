const camera = {
    x: 0,
    y: 0,

    move() {
        this.x = -(player.x + player.width / 2) * block + CW / 2;
        this.y = -(player.y + player.height / 2) * block + CH / 2;
        this.barrier();
    },

    barrier() {
        if (-this.x + CW > (map.width + 1) * block) this.x = -(map.width + 1) * block + CW;
        if (this.x > 0) this.x = 0;

        if (-this.y + CH > (map.height + 1) * block) this.y = -(map.height + 1) * block + CH;
        if (this.y > 0) this.y = 0;
    },
};
