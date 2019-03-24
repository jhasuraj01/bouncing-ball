// getting buttons on html page
let start_menu_window = document.getElementById('start-menu-window');
let start_button = document.getElementById('startGame');
let pause_button = document.getElementById('pauseGame');
let resume_button = document.getElementById('resumeGame');
let end_menu_window = document.getElementById('end-menu-window');
let cancelEndGameWindow_btn = document.getElementById('end-menu-cancel-btn');

let startNewGame = () => {
    game.startNew();
    game.state.setNewThrow();
    start_menu_window.style.display = 'none';
}

start_button.addEventListener('click', startNewGame);
pause_button.addEventListener('click', () => { game.state.pause(); });
resume_button.addEventListener('click',  () => { game.state.resume(); });
canvas.addEventListener('click', () => { game.throwBall(); })
cancelEndGameWindow_btn.addEventListener('click', () => {
    start_menu_window.style.display = 'flex';
    end_menu_window.style.display = 'none';
});
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