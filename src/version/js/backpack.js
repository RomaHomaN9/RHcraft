const backpack = {
    x: 0.5,
    y: 0.3,
    width: 0.5,
    border: 1,

    block: 0, //index

    render() {
        //block

        const thisBlock = Object.values(map.blocks)[this.block];

        if (Object.keys(map.blocks)[this.block] == "gun") {
            ctx.drawImage(
                thisBlock,
                this.x * block,
                (this.y + gun.height / 4) * block,
                gun.width * block,
                gun.height * block,
            );
        } else ctx.drawImage(thisBlock, this.x * block, this.y * block, this.width * block, this.width * block);

        //text

        ctx.font = this.width * block + "px Consolas, Bold";
        ctx.fillStyle = "#000";

        let text = Object.keys(map.blocks)[this.block].toUpperCase();

        ctx.fillText(text, (this.x + this.width) * block, (this.y + this.width - 0.1) * block);
    },

    limit(velocity) {
        let maxValue = Object.values(map.blocks).length - 1;

        if (this.block < 0) this.block = maxValue;
        if (this.block > maxValue) this.block = 0;

        if (map.blocksCategory.isReturn(false, "cannotUse", Object.keys(map.blocks)[this.block])) {
            this.block += velocity;
            this.limit(velocity);
        }
    },

    setBlock(velocity) {
        this.block += velocity;

        this.limit(velocity);
    },
};
