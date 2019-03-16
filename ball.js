class Ball {
    constructor(game, color, center, radius, velocity) {
        this.game = game;
        this.color = color;

        this.center = { x: center.x, y: center.y };
        this.radius = radius;
        this.velocity = new Vector(velocity.x, velocity.y);
    }
    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.fill();
    }
    update() {
        this.center.x += this.velocity.x / this.game.deltaTime;
        this.center.y += this.velocity.y / this.game.deltaTime;

        if (this.center.x + this.radius > this.game.canvas.width || this.center.x < this.radius) {
            this.velocity.x = - this.velocity.x;
        }
        if (this.center.y < this.radius) {
            this.velocity.y = - this.velocity.y;
        }
        if (this.center.y + this.radius > this.game.canvas.height && this.game.currentState !== this.game.state.firstBallReached) {
            this.game.currentState = this.game.state.firstBallReached;
            this.game.currentLevel++;
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        this.game.boxes.forEach(elm => {

            if (collision.horizontal(this, elm)) {
                this.velocity.x = - this.velocity.x;
                elm.power--;
            }
            else if (collision.vertical(this, elm)) {
                this.velocity.y = - this.velocity.y;
                elm.power--;
            }
            // if (collision.corner(this, elm)) {
            //     let temp_x = this.velocity.x;
            //     let temp_y = this.velocity.y;
            //     this.velocity.x = - temp_y;
            //     this.velocity.y = - temp_x;
            // }
        });

    }
}