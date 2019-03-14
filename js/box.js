class Box {
    constructor(game, color) {
        this.game = game;
        this.color = color;
        
        this.position = {x: 200, y: 200};
        this.width = 100;
        this.height = 100;
    }
    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.game.ctx.strokeStyle = 'grey';
        // this.game.ctx.lineWidth = (this.width + this.height)/30;
        // this.game.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        //
    }
}