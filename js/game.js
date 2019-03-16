const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    WON: 4,
    FIRST_BALL_REACHED: 5
};
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.color = ['red', 'green', 'blue', 'yellow', 'skyblue', 'indianRed'];
        this.balls = [];
        this.boxes = [];
        this.currentLevel = 0;
        this.status = GAMESTATE.MENU;
        this.levels = [
            [1, 0, 1, 0, 1, 0, 0 , 1]
        ]
        this.addBox();
        this.addBall();
    }
    draw() {
        if(this.status === GAMESTATE.MENU) {
            this.status = GAMESTATE.RUNNING;
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
        this.balls.push(new Ball(this, 'red', { x: 416, y: 486 }, { x: 50, y: -50 }));
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