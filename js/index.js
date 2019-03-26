let canvas = document.getElementById('game-field');
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
console.log(`canvas.width : ${canvas.width}, canvas.height : ${canvas.height}`);
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
    } else if (game.currentState === game.state.over) {
        gameOver();
    } else {
        game.animationFrameStoped = true;
    }
}
requestAnimationFrame(gameLoop);
let gameOver = () => {
    game.animationFrameStoped = true;
    cancelAnimationFrame(game.animation);
    document.getElementById('score-value').innerText = `${game.currentLevel} Lines`;
    end_menu_window.style.display = 'block';
}
// setTimeout(() => {
//     game.currentState = game.state.paused;
// }, 3100); 