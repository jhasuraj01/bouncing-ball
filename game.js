class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.color = ['red', 'green', 'blue', 'yellow', 'skyblue', 'indianRed'];
        this.balls = [];
        this.ballRadius = (this.canvas.width + this.canvas.height)/100;
        this.ballStartPoint = { x: this.canvas.width/2, y: (this.canvas.height - this.ballRadius) };
        this.boxes = [];
        this.currentLevel = 0;
        this.state = new Gamestate(this);
        this.currentState = this.state.menu;
        this.levels = [
            [1, 0, 1, 0, 1, 0, 0 , 1]
        ]
        this.addBox();
        this.addBall();
    }
    draw() {
        if(this.currentState === this.state.menu) {
            this.currentState = this.state.running;
        }
        this.ctx.fillStyle = '#abcdef';
        this.ctx.fillRect(5, this.canvas.height - 25, this.canvas.width - 10, 20);
        this.balls.forEach(ball => ball.draw());
        this.boxes.forEach(box => box.draw());
    }
    update() {
        this.boxes.forEach(box => box.update());
        this.balls.forEach(ball => ball.update());
    }
    addBall() {
        this.balls.push(new Ball(this, 'red', this.ballStartPoint, this.ballRadius, { x: 50, y: -50 }));
        // this.balls.push(new Ball(this, 'pink', {x: 476, y: 26}, {x: -50, y: 50}));
        // this.balls.push(new Ball(this, 'yellow', {x: 486, y: 486}, {x: -50, y: -50}));
        // this.balls.push(new Ball(this, 'skyblue', {x: 16, y: 16}, {x: 50, y: 50}));
    }
    addBox() {
            const newRow = this.levels[this.currentLevel];
            newRow.forEach((box, boxIndex) => {
                // this.boxes.push(new Box(this, Math.ceil(this.currentLevel + 1 + Math.random()*this.currentLevel), 'red', this.currentLevel, boxIndex));
                this.boxes.push(new Box(this, box, 'red', this.currentLevel, boxIndex));
            });
    }

}