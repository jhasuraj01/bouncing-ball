class Ball {
    constructor(game, color, position, velocity) {
        this.game = game;
        this.color = color;

        this.position = { x: position.x, y: position.y };
        this.radius = 15;
        this.velocity = new Vector(velocity.x, velocity.y);
    }
    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.fill();
    }
    update() {
        this.position.x += this.velocity.x / this.game.deltaTime;
        this.position.y += this.velocity.y / this.game.deltaTime;

        this.game.boxes.forEach(elm => {
            if (this.position.x + this.radius > this.game.canvas.width || this.position.x < this.radius || collision.horizontal(this, elm)) this.velocity.x = - this.velocity.x;
            if (this.position.y + this.radius > this.game.canvas.height || this.position.y < this.radius || collision.vertical(this, elm)) this.velocity.y = - this.velocity.y;
            if (collision.corner(this, elm)) {
                let temp_x = this.velocity.x;
                let temp_y = this.velocity.y;
                this.velocity.x = - temp_y;
                this.velocity.y = - temp_x;
            }
        });

    }
}