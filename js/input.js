// getting buttons on html page
let start_menu_window = document.getElementById('start-menu-window');
let start_button = document.getElementById('startGame');
let pause_button = document.getElementById('pauseGame');
let resume_button = document.getElementById('resumeGame');
let end_menu_window = document.getElementById('end-menu-window');
let cancelEndGameWindow_btn = document.getElementById('end-menu-cancel-btn');
let body = document.querySelector('body');
let startNewGame = () => {
    game.startNew();
    game.state.setNewThrow();
    start_menu_window.style.display = 'none';
}

let openFullscreen = () => {
    if (body.requestFullscreen) {
        body.requestFullscreen();
    } else if (body.mozRequestFullScreen) { /* Firefox */
        body.mozRequestFullScreen();
    } else if (body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) { /* IE/Edge */
        body.msRequestFullscreen();
    }
}
document.getElementById('openFullscreen').addEventListener('click', openFullscreen);
let closeFullscreen = () => {
    if (body.exitFullscreen) {
        body.exitFullscreen();
    } else if (body.mozCancelFullScreen) { /* Firefox */
        body.mozCancelFullScreen();
    } else if (body.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        body.webkitExitFullscreen();
    } else if (body.msExitFullscreen) { /* IE/Edge */
        body.msExitFullscreen();
    }
}
document.getElementById('closeFullscreen').addEventListener('click', closeFullscreen);

start_button.addEventListener('click', startNewGame);
pause_button.addEventListener('click', () => { game.state.pause(); });
resume_button.addEventListener('click', () => { game.state.resume(); });
canvas.addEventListener('click', () => { game.throwBall(); })
cancelEndGameWindow_btn.addEventListener('click', () => {
    start_menu_window.style.display = 'block';
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