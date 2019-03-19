class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.colors = ['red', 'green', 'blue', 'yellow', 'indianRed', 'orange'];

        this.boxes = [];
        this.balls = [];
        this.numberOfBall = 5;
        this.numberOfBallReached = 0;
        this.ballRadius = (this.canvas.width + this.canvas.height) / 100;
        this.ballSpeed = (this.canvas.width + this.canvas.height) / 10;
        this.ballLaunchBox = {
            x: 0,
            y: this.canvas.height - this.ballRadius * 3,
            width: this.canvas.width,
            height: this.ballRadius * 3
        };
        this.ballStartPoint = { x: this.canvas.width / 2, y: (this.ballLaunchBox.y + this.ballLaunchBox.height / 2) };

        this.launcher = new Launcher(this);
        this.collision = new Collision(this);

        this.currentLevel = 0;
        this.levels = [
            [4, 0, 1, 0, 1, 0, 0, 1],
            [1, 3, 5, 6, 4, 5, 8, 0],
            [10, 20, 30, 50, 0, 0, 0 ,0],
            [4, 6, 3, 5, 6, 8, 9, 6]
        ];

        this.state = new Gamestate(this);
        this.currentState = this.state.menu;

        this.addBox();
        this.addBall();
    }
    update() {
        if (this.currentState === this.state.newThrow) this.launcher.update();
        this.boxes.forEach(box => box.update());
        this.balls.forEach(ball => ball.update());
        if (this.numberOfBallReached === this.numberOfBall && this.currentState !== this.state.newThrow) {
            this.currentLevel++;
            this.addBox();
            this.currentState = this.state.newThrow;
        }
    }
    draw() {
        this.ctx.fillStyle = '#abcdef';
        this.ctx.fillRect(this.ballLaunchBox.x, this.ballLaunchBox.y, this.ballLaunchBox.width, this.ballLaunchBox.height);
        if (this.currentState === this.state.newThrow) this.launcher.draw();
        this.balls.forEach(ball => ball.draw());
        this.boxes.forEach(box => box.draw());
    }
    addBall() {
        for (let i = 0; i < this.numberOfBall; i++) {
            this.balls.push(new Ball(this, this.colors[(i) % this.colors.length], this.ballStartPoint, this.ballRadius, { x: 0, y: 0 }));
        }
    }
    addBox() {
        const newRow = this.levels[this.currentLevel];
        if (!newRow) return;
        newRow.forEach((box, boxIndex) => {
            // this.boxes.push(new Box(this, Math.ceil(this.currentLevel + 1 + Math.random()*this.currentLevel), 'red', this.currentLevel, boxIndex));
            this.boxes.push(new Box(this, box, 'red', this.currentLevel, boxIndex));
        });
    }
    throwBall() {
        if (this.currentState !== this.state.newThrow) return;
        this.balls.forEach((elm, elmIndex) => {
            elm.velocity.x = (this.ballSpeed * this.launcher.direction.unitVector().x) * (1 + elmIndex / this.numberOfBall);
            elm.velocity.y = (this.ballSpeed * this.launcher.direction.unitVector().y) * (1 + elmIndex / this.numberOfBall);
        });
        this.currentState = this.state.running;
        this.numberOfBallReached = 0;
    }

}