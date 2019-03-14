class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.color = ['red', 'green', 'blue', 'yellow', 'skyblue', 'indianRed'];
        this.balls = [];
        this.boxes = [];
        this.addBall();
        this.addBox();
    }
    draw() {
        this.ctx.fillStyle = '#abcdef';
        this.ctx.fillRect(5, this.canvas.height - 25, this.canvas.width - 10, 20);
        this.balls.forEach(ball => ball.draw());
        this.boxes.forEach(box => box.draw());
    }
    update() {
        this.balls.forEach(ball => ball.update());
        this.boxes.forEach(box => box.update());
    }
    addBall() {
        this.balls.push(new Ball(this, 'red', {x: 16, y: 486}, {x: 50, y: -50}));
        this.balls.push(new Ball(this, 'pink', {x: 476, y: 26}, {x: -50, y: 50}));
        this.balls.push(new Ball(this, 'yellow', {x: 486, y: 486}, {x: -50, y: -50}));
        this.balls.push(new Ball(this, 'skyblue', {x: 16, y: 16}, {x: 50, y: 50}));
    }
    addBox() {
        this.boxes.push(new Box(this, 'red'));
    }
}