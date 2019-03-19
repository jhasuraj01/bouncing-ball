class Coin {
    constructor(game, power, color, rowNumber, columnNumber) {
        this.game = game;
        this.center = { x: center.x, y: center.y };
        let boxSides = game.canvas.width/game.levels[0].length;
        this.radius = { x: boxSides*0.9, y: boxSides*0.7 };
    }
    update() {
        this.position.y = this.height * (this.game.currentLevel - this.rowNumber);
    }
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.ellipse(this.center.x, this.center.y, this.radius.x, this.radius.y, 1, 0, Math.PI * 2, true);
        this.game.ctx.fillStyle = 'yellow';
        this.game.ctx.ellipse(this.center.x, this.center.y, this.radius.x*0.8, this.radius.y*0.8, 1, 0, Math.PI * 2, true);
        this.game.ctx.fill();
        this.game.ctx.closePath();
    }
}