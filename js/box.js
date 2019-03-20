class Box {
    constructor(game, power, color, rowNumber, columnNumber) {
        this.game = game;
        this.color = color;
        this.power = power;
        this.rowNumber = rowNumber;
        
        this.height = this.width = this.game.boxSideLength;
        this.position = {};
        this.position.x = this.width * columnNumber;
        this.position.y = 0;
    }
    update() {
        this.position.y = this.height * (this.game.currentLevel - this.rowNumber);
        if(this.position.y + this.height >= this.game.ballLaunchBox.y) {
            this.game.currentState = this.game.state.over;
        }
    }
    draw() {
        if(this.power <= 0) {
            this.game.boxes = this.game.boxes.filter((elm) => elm.power > 0);
            return;
        }
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.game.ctx.font = `${this.width/2}px Arial`;
        this.game.ctx.textBaseline = "middle";
        this.game.ctx.fillStyle = "black";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(this.power, this.position.x + this.width/2, this.position.y + this.height/2);
    }
}