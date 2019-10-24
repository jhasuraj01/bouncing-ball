class Coin {
    constructor(game, rowNumber, columnNumber) {
        this.game = game;
        this.power = 1;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
        this.center = {
            x: this.game.boxSideLength * (0.5 + this.columnNumber),
            y: this.game.boxSideLength * 0.5
        };
        this.radius = { x: this.game.boxSideLength*0.4, y: this.game.boxSideLength*0.3 };
    }
    update() {
        if(this.power === 0) {
            this.game.coins = this.game.coins.filter((elm) => elm.power > 0);
            return;
        }
        // this.center.y = this.game.boxSideLength/2 + this.game.boxSideLength * (this.game.currentLevel - this.rowNumber);
        this.center.y = this.game.boxSideLength * (0.5 + this.game.currentLevel - this.rowNumber);
    }
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = '#ffff00';
        this.game.ctx.ellipse(this.center.x, this.center.y, this.radius.x, this.radius.y, 1, 0, Math.PI * 2, true);
        this.game.ctx.fill();
        this.game.ctx.closePath();
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = '#dddd00';
        this.game.ctx.ellipse(this.center.x, this.center.y, this.radius.x*0.8, this.radius.y*0.6, 1, 0, Math.PI * 2, true);
        this.game.ctx.fill();
        this.game.ctx.closePath();

        
        this.game.ctx.font = `${(this.radius.x > this.radius.y ? this.radius.y : this.radius.x) *8} px Arial`;
        this.game.ctx.textBaseline = "middle";
        this.game.ctx.fillStyle = "black";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText('$', this.center.x, this.center.y);
    }
}