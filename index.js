let canvas = document.getElementById('game-field');
let game = new Game(canvas);

let previousTime = 0;
let gameLoop = (timeStamp) => {
    game.deltaTime = timeStamp - previousTime;
    console.log(`timestamp: ${timeStamp}; previousTime: ${previousTime}; DeltaTime: ${game.deltaTime}`);
    previousTime = timeStamp;
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.draw();
    game.update();

    if(game.currentState === game.state.running || game.currentState === game.state.firstBallReached) {
        game.animation = requestAnimationFrame(gameLoop);
    }
}
requestAnimationFrame(gameLoop);
setTimeout(() => {
    cancelAnimationFrame(game.animation);
}, 3000); 