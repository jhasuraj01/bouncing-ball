class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.colors = ['#f00000', '#00f000', '#0000f0', '#ff0000', '#00ff00', '#0000ff', '#0ff000', '#000ff0', '#f0000f', '#fff000', '#00fff0', '#f000ff', '#000fff', '#0fff00', '#ff000f', '#ffff00', '#00ffff', '#0ffff0', '#f00fff', '#ff00ff', '#fff00f', '#fffff0', '#f0ffff', '#fff0ff', '#0fffff', '#ffff0f', '#ff0fff'];
        this.complementaryColors = ['#0fffff', '#ff0fff', '#ffff0f', '#00ffff', '#ff00ff', '#ffff00', '#f00fff', '#fff00f', '#0ffff0', '#000fff', '#ff000f', '#0fff00', '#fff000', '#f000ff', '#00fff0', '#0000ff', '#ff0000', '#f0000f', '#0ff000', '#00ff00', '#000ff0', '#00000f', '#0f0000', '#000f00', '#f00000', '#0000f0', '#00f000'];
        this.set();
        // negative represents coin
        this.levels = [
            [1, 0, 1, 0, 1, 0, 0, -1],
            [-1, 0, 0, 1, 0, 2, 0, 0],
            [1, -1, 0, 4, 0, 0, 3, 3],
            [0, 0, 3, -1, 4, 8, 9, 0],
            [4, 0, 1, 0, 1, 0, 0, -1],
        ];
        this.boxSideLength = (this.canvas.width) / (this.levels[0].length);

        this.collision = new Collision(this);

        this.state = new Gamestate(this);
        this.currentState = this.state.menu;

        this.launcher = new Launcher(this);
    }
    set() {
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.scrollHeight;
        this.ballRadius = (this.canvas.width + this.canvas.height) / 100;
        this.ballSpeed = (this.canvas.width + this.canvas.height) / 6;
        this.ballLaunchBox = {
            x: 0,
            y: this.canvas.height - this.ballRadius * 3,
            width: this.canvas.width,
            height: this.ballRadius * 3
        };
    }
    startNew() {
        this.set();
        this.boxes = [];
        this.coins = [];
        this.balls = [];
        this.numberOfBall = 0; // incremented in addBall() function
        this.numberOfNewBall = 1;
        this.numberOfBallReached = 0;
        this.currentLevel = 0;
        this.ballStartPoint = { x: this.canvas.width / 2, y: (this.ballLaunchBox.y + this.ballLaunchBox.height / 2) };

        this.addBox();
        this.addBall(this.numberOfNewBall);
    }
    update() {
        if (this.currentState === this.state.menu) return;
        if (this.currentState === this.state.newThrow) this.launcher.update();
        this.boxes.forEach(box => box.update());
        this.coins.forEach(coin => coin.update());
        this.balls.forEach(ball => ball.update());
        if (this.currentState === this.state.over) return; //do not add new items on screen
        if (this.numberOfBallReached === this.numberOfBall && this.currentState !== this.state.newThrow) {
            this.currentLevel++;
            current_score_foruserInfo.innerText = `Score: ${this.currentLevel}`;
            this.addBox();
            if (this.numberOfNewBall) {
                this.addBall(this.numberOfNewBall);
            }
            this.currentState = this.state.newThrow;
        }
    }
    draw() {
        if (this.currentState === this.state.menu) return;
        this.ctx.fillStyle = '#abcdef';
        this.ctx.fillRect(this.ballLaunchBox.x, this.ballLaunchBox.y, this.ballLaunchBox.width, this.ballLaunchBox.height);
        if (this.currentState === this.state.newThrow) this.launcher.draw();
        this.balls.forEach(ball => ball.draw());
        this.boxes.forEach(box => box.draw());
        this.coins.forEach(coin => coin.draw());
    }
    addBall(num) {
        for (let i = 0; i < num; i++) {
            this.balls.push(new Ball(this, this.colors[(this.numberOfBall) % this.colors.length], this.ballStartPoint, this.ballRadius, { x: 0, y: 0 }));
            this.numberOfBall++;
        }
        this.numberOfNewBall = 0;
    }
    random() {
        let arr = [-1, 0, 1];
        let result = arr[( Math.ceil(Math.random() * 10))%arr.length];
        // alert(result)
        return result;
    }
    addBox() {
        const newRow = this.levels[(this.currentLevel) % this.levels.length];
        if (!newRow) return;
        newRow.forEach((box, boxIndex) => {
            box = this.random();
            if (box < 0) {
                this.coins.push(new Coin(this, this.currentLevel, boxIndex));
            } else if (box > 0) {
                // this.boxes.push(new Box(this, Math.ceil(this.currentLevel + 1 + Math.random()*this.currentLevel), 'red', this.currentLevel, boxIndex));
                this.boxes.push(new Box(this, Math.ceil(this.currentLevel + this.numberOfBall + 1 + 5 * Math.random() * this.currentLevel), 'red', this.currentLevel, boxIndex));
            }
        });
    }
    throwBall() {
        if (this.currentState !== this.state.newThrow) return;
        this.balls.forEach((elm, elmIndex) => {
            setTimeout(() => {
                elm.velocity.x = (this.ballSpeed * this.launcher.direction.unitVector().x);
                elm.velocity.y = (this.ballSpeed * this.launcher.direction.unitVector().y); //elmIndex / this.numberOfBall
            }, 100*elmIndex*(Math.pow(2, -this.numberOfBall) + 1));
        });
        this.currentState = this.state.running;
        this.numberOfBallReached = 0;
    }

}