class Ball {
    constructor(game, color, center, radius, velocity) {
        this.game = game;
        this.color = color;
        this.reached = false;

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

        // if(this.game.currentState === this.game.state.newThrow) return;

        // check collision with vertical wall
        if (this.center.x + this.radius > this.game.canvas.width || this.center.x < this.radius) {
            if (this.velocity.x > 0) {
                this.center.x = this.game.canvas.width - this.radius;
            } else if (this.velocity.x < 0) {
                this.center.x = this.radius;
            }
            this.velocity.x = - this.velocity.x;
        }
        // check collision with top horizontal wall
        if (this.center.y < this.radius) {
            this.center.y = this.radius;
            this.velocity.y = - this.velocity.y;
        }

        // check collision with bottom ball and stop ball
        if (this.center.y + this.radius > this.game.canvas.height || this.reached) {
            this.velocity.y = 0;
            this.reached = true; // label the ball who reached bottom ball
            this.center.y = this.game.ballStartPoint.y;
            if (this.game.currentState !== this.game.state.firstBallReached) {
                this.velocity.x = 0;
                this.game.currentLevel++;
                this.game.currentState = this.game.state.firstBallReached;
                this.game.firstBallReached = this;
                this.game.numberOfBallReached++;
                // use x-coordinate of first ball for next launch
                this.game.ballStartPoint.x = this.center.x;
                this.reached = false; // reset the label for next round
            } else {
                // to bring all the ball at the same position
                if (this.center.x - this.game.ballStartPoint.x > this.radius) {
                    this.velocity.x = - Math.abs(this.velocity.x);
                } else if (this.center.x - this.game.ballStartPoint.x < - this.radius) {
                    this.velocity.x = Math.abs(this.velocity.x);
                } else {
                    this.velocity.x = 0;
                    this.center.x = this.game.ballStartPoint.x;
                    if (this.reached) {
                        this.game.numberOfBallReached++;
                        this.reached = false; // reset the label for next round
                    }
                }
            }
        }

        // check collision with boxes
        this.game.boxes.forEach(elm => {

            if (collision.horizontal(this, elm)) {
                if (this.velocity.x > 0) {
                    this.center.x = elm.position.x - this.radius;
                } else if (this.velocity.x < 0) {
                    this.center.x = elm.position.x + elm.width + this.radius;
                }
                this.velocity.x = - this.velocity.x;
                elm.power--;
            }
            else if (collision.vertical(this, elm)) {
                if (this.velocity.y > 0) {
                    this.center.y = elm.position.y - this.radius;
                } else if (this.velocity.y < 0) {
                    this.center.y = elm.position.y + elm.height + this.radius;
                }
                this.velocity.y = - this.velocity.y;
                elm.power--;
            }
            else if (collision.corner(this, elm)) {
                let temp_x = this.velocity.x;
                let temp_y = this.velocity.y;
                this.velocity.x = - temp_y;
                this.velocity.y = - temp_x;
            }
        });

    }
}