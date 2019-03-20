class Gamestate {
    constructor(game) {
        this.game = game;
        this.paused = 0;
        this.running = 1;
        this.menu = 2;
        this.over = 3;
        this.won = 4;
        this.firstBallReached = 5;
        this.newThrow = 6;
    }
    toggleResume() {
        if (this.game.currentState === this.game.state.paused) {
            this.resume();
        } else {
            this.pause();
        }
    }
    pause() {
        this.game.currentState = this.game.state.paused;
    }
    resume() {
        if (this.game.currentState !== this.game.state.running) {
            this.game.currentState = this.game.state.running;
        }
        if (this.game.animationFrameStoped) {
            requestAnimationFrame(gameLoop);
        }
    }
    setNewThrow() {
        game.currentState = game.state.newThrow;
        if (this.game.animationFrameStoped) {
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