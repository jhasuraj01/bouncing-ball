// getting buttons on html page
let start_button = document.getElementById('startGame');
let pause_button = document.getElementById('pauseGame');
let resume_button = document.getElementById('resumeGame');


start_button.addEventListener('click', () => { game.state.setNewThrow(); });
pause_button.addEventListener('click', () => { game.state.pause(); });
resume_button.addEventListener('click',  () => { game.state.resume(); });
canvas.addEventListener('click', () => { game.throwBall(); })

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 80: // p button
            game.state.toggleResume();
            break;
        case 82: //r button
            game.state.setNewThrow();
            break;
    }
});