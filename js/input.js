document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 80: // p button
            game.state.toggleResume();
            break;
        case 82: //r button
            // game.state.startNew();
            break;
    }
});