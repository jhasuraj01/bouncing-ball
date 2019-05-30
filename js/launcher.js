class Launcher {
    constructor(game) {
        this.game = game;
        this.center = {
            x: this.game.canvas.width / 2,
            y: (this.game.ballLaunchBox.y + this.game.ballLaunchBox.height / 2)
        }
        this.target = { x: this.center.x, y: this.center.y };
        this.game.canvas.addEventListener('mousemove', this.updateTarget);
        this.game.canvas.addEventListener('touchstart', this.updateTarget);
        this.game.canvas.addEventListener('touchmove', this.updateTarget);

        this.length = this.game.canvas.width / 2;
        this.radius = this.game.ballRadius;
        this.direction = new Vector(this.game.canvas.width / 2 - this.center.x, this.game.canvas.height / 2 - this.center.y);
    }
    update() {
        this.center = {
            x: this.game.ballStartPoint.x,
            y: this.game.ballStartPoint.y
        }
        this.direction.x = this.target.x - this.center.x;
        this.direction.y = this.target.y - this.center.y;
        this.direction.magnitude(this.length);
    }
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = 'red';
        this.game.ctx.setLineDash([5, 3, 2]);
        this.game.ctx.moveTo(this.center.x, this.center.y);
        this.game.ctx.lineTo(this.center.x + this.direction.x, this.center.y + this.direction.y);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
    updateTarget(event) {
        let rect = event.target.getBoundingClientRect();
        if (event.targetTouches) {
            game.launcher.target.x = (event.targetTouches[0].pageX - rect.left + event.targetTouches[0].radiusX) || event.offsetX;
            game.launcher.target.y = (event.targetTouches[0].pageY - rect.top + event.targetTouches[0].radiusY) || event.offsetY;
        } else {
            game.launcher.target.x = event.offsetX;
            game.launcher.target.y = event.offsetY;
        }
    }
}