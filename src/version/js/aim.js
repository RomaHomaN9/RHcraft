const aim = {
    width: 0.03 * block,

    centerX: CW / 2,
    partX: CW / 3,
    centerY: CH / 2,

    render() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.partX, 0, this.width, CH);
        ctx.fillRect(this.partX * 2, 0, this.width, CH);
        ctx.fillRect(this.partX, this.centerY, this.partX, this.width);
    },

    reset() {
        this.width = 0.03 * block;

        this.centerX = CW / 2;
        this.partX = CW / 3;
        this.centerY = CH / 2;
    },
};
