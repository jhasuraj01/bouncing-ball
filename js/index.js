let canvas = document.getElementById('game-field');
let game = new Game(canvas);

let previousTime = 0;
let gameLoop = (timeStamp) => {
    game.deltaTime = timeStamp - previousTime;
    // console.log(`timestamp: ${timeStamp}; previousTime: ${previousTime}; DeltaTime: ${game.deltaTime}`);
    previousTime = timeStamp;

    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.update();
    game.draw();
    if (game.currentState === game.state.running || game.currentState === game.state.firstBallReached || game.currentState === game.state.newThrow) {
        game.animation = requestAnimationFrame(gameLoop);
        game.animationFrameStoped = false;
    } else {
        game.animationFrameStoped = true;
    }
}
requestAnimationFrame(gameLoop);
// setTimeout(() => {
//     game.currentState = game.state.paused;
//     cancelAnimationFrame(game.animation);
// }, 3100); 