class Gamestate {
    constructor(game) {
        this.game = game;
        this.paused = 0;
        this.running = 1;
        this.menu = 2;
        this.gameover = 3;
        this.won = 4;
        this.firstBallReached = 5;
    }
    toggleResume() {
        if (this.game.currentState === this.game.state.running) {
            game.currentState = game.state.paused;
        } else {
            this.game.currentState = this.game.state.running;
            requestAnimationFrame(gameLoop);
        }
    }
    // startNew() {
    //     console.log(this.game)
    //     this.toggleResume();
    //     delete this.game;
    //     this.game = new Game(canvas);
    //     console.log(this.game);
    // }
}