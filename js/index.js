let canvas = document.getElementById('game-field');
let game = new Game(canvas);

let previousTime = 0;
let gameLoop = (timeStamp) => {
    game.deltaTime = timeStamp - previousTime;
    previousTime = timeStamp;

    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.draw();
    game.update();

    game.running = requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

setTimeout(() => {
    cancelAnimationFrame(game.running);
}, 5000);

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 80: // p button
            cancelAnimationFrame(game.running);
            break;
        case 77: //l button
            requestAnimationFrame(gameLoop);
            break;
    }
});
// setTimeout(() => {
//     requestAnimationFrame(gameLoop);
// }, 20000);
// setTimeout(() => {
//     cancelAnimationFrame(game.running);
// }, 30000);