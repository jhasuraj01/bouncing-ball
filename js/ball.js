class Ball {
    constructor(game, color, center, velocity) {
        this.game = game;
        this.color = color;
        this.reached = false;

        this.center = { x: center.x, y: center.y };
        this.radius = this.game.ballRadius;
        this.velocity = new Vector(velocity.x, velocity.y);
    }
    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.closePath();
        this.game.ctx.fill();
    }
    update() {
        this.center.x += this.velocity.x * this.game.deltaTime * 0.003;
        this.center.y += this.velocity.y * this.game.deltaTime *0.003;

        // handle collision with vertical wall
        this.game.collision.handleVerticalWall(this);

        // check collision with top horizontal wall
        if (this.game.collision.topWall(this)) {
            this.center.y = this.radius;
            this.velocity.y = - this.velocity.y;
        }
        // check collision with bottom ball and stop ball
        else if (this.game.collision.bottomWall(this) || this.reached) {
            this.velocity.y = 0;
            this.velocity.x = this.game.ballSpeed;
            this.reached = true; // label the ball who reached bottom ball
            this.center.y = this.game.ballStartPoint.y;
            if (this.game.currentState !== this.game.state.firstBallReached) {
                this.velocity.x = 0;
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

            if (this.game.collision.handleHorizontalOfObject(this, elm)) {
                elm.power--;
            }
            else if (this.game.collision.handleVerticalOfObject(this, elm)) {
                elm.power--;
            }
            else if (this.game.collision.corner(this, elm)) {
                elm.power--;
            }
        });
        // check collision with coins
        this.game.coins.forEach(elm => {
            if (Math.abs(elm.center.x - this.center.x) <= this.radius + elm.radius.x && Math.abs(elm.center.y - this.center.y) <= this.radius + elm.radius.x && elm.power > 0) {
                elm.power = 0;
                this.game.numberOfNewBall++;
                number_of_balls_foruserInfo.innerText = `Balls: ${this.game.numberOfNewBall + this.game.numberOfBall}`;
            }
        });

    }
}