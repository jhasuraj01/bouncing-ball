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

/*
  Event listeners for Full Screen Mode.
*/
let startFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
}
let endFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if (doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
        cancelFullScreen.call(doc);
    }
}
for (const btn of document.getElementsByClassName('startFullScreen')) {
    btn.addEventListener('click', startFullScreen);
}
for (const btn of document.getElementsByClassName('endFullScreen')) {
    btn.addEventListener('click', endFullScreen);
}

// let toggleFullScreen = () => {
//     var doc = window.document;
//     var docEl = doc.documentElement;

//     var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
//     var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

//     if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
//         requestFullScreen.call(docEl);
//     }
//     else {
//         cancelFullScreen.call(doc);
//     }
// }
// for (const btn of document.getElementsByClassName('toggleFullScreen')) {
//     btn.addEventListener('click', toggleFullScreen);
// }

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