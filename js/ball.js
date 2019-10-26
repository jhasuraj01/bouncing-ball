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
        //if statement code; add gravity and delete it
        if (Math.abs(this.velocity.y/this.velocity.x) < 0.1) {
            this.velocity.y > 0 ? this.velocity.y++ : this.velocity.y--;
        }

        this.center.x += this.velocity.x * this.game.deltaTime * 0.003;
        this.center.y += this.velocity.y * this.game.deltaTime * 0.003;

        // check collision with right vertical wall
        if (this.game.collision.rightWall(this)) {
            this.velocity.x = - this.velocity.x;
            this.center.x = this.game.canvas.width - this.radius;
        }
        // check collision with left vertical wall
        else if (this.game.collision.leftWall(this)) {
            this.velocity.x = - this.velocity.x;
            this.center.x = this.radius;
        }

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
        let touchedNoOfCorners;
        let touchedNoOfHorizonalSide;
        let touchedNoOfVerticleSide;
        // check collision with boxes
        this.game.boxes.forEach((elm, index) => {

            if (index === 0) {                  //temp code 1
                touchedNoOfCorners = [];         //temp code 1
                touchedNoOfVerticleSide = [];    //temp code 1
                touchedNoOfHorizonalSide = [];   //temp code 1
            }                                   //temp code 1

            if (this.game.collision.handleHorizontalOfObject(this, elm)) {
                elm.power--;
                touchedNoOfHorizonalSide.push(elm);     //temp code 1
            }
            else if (this.game.collision.handleVerticalOfObject(this, elm)) {
                elm.power--;
                touchedNoOfVerticleSide.push(elm);      //temp code 1
            }
            else if (this.game.collision.corner(this, elm)) {
                elm.power--;
                touchedNoOfCorners.push(elm);           //temp code 1
            }

            if (touchedNoOfCorners.length > 1) {       //temp code 1
                this.color = '#ffffff';         //temp code 1
                console.log('multiple corner'); //temp code 1
                console.log(touchedNoOfCorners);               //temp code 1
            }                                   //temp code 1
            if (touchedNoOfHorizonalSide.length > 1) { //temp code 1
                this.color = '#ffffff';         //temp code 1
                console.log('multiple horizontal'); //temp code 1
                console.log(touchedNoOfHorizonalSide);
            }                                   //temp code 1
            if (touchedNoOfVerticleSide.length > 1) {  //temp code 1
                this.color = '#ffffff';         //temp code 1
                console.log('multiple verticle'); //temp code 1
                console.log(touchedNoOfVerticleSide);
            }                                   //temp code 1
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