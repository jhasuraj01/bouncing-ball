let collision = {
    horizontal(ball, obj) {
        // checking obj.right == ball.left || obj.left == ball.right) && ball.top < obj.bottom && ball.bottom > obj.top 
        if ((obj.position.x + obj.width >= ball.center.x - ball.radius && obj.position.x <= ball.center.x + ball.radius) && ball.center.y >= obj.position.y && ball.center.y <= obj.position.y + obj.height) { console.log('h'); return true; }
        else return false;
    },
    vertical(ball, obj) {
        // checking obj.top == ball.bottom || obj.bottom == ball.top) && ball.left > obj.right && ball.right < obj.left
        if ((obj.position.y <= ball.center.y + ball.radius && obj.position.y + obj.height >= ball.center.y - ball.radius) && ball.center.x >= obj.position.x && ball.center.x <= obj.position.x + obj.width) { console.log('v'); return true; }
        else return false;
    },
    corner(ball, obj) {
        let T_top_left = Math.abs(obj.position.x - ball.center.x) <= ball.radius && Math.abs(obj.position.y - ball.center.y) <= ball.radius;

        let T_top_right = Math.abs(ball.center.x - obj.position.x - obj.width) <= ball.radius && Math.abs(obj.position.y - ball.center.y) <= ball.radius;

        let T_bottom_left = Math.abs(obj.position.x - ball.center.x) <= ball.radius && Math.abs(ball.center.y - obj.position.y - obj.height) <= ball.radius;

        let T_bottom_right = Math.abs(ball.center.x - obj.position.x - obj.width) <= ball.radius && Math.abs(ball.center.y - obj.position.y - obj.height) <= ball.radius;

        // if (T_bottom_left) {
        //     console.log('bl');
        //     return true;
        // } else
        //  if (T_bottom_right) {
        //     console.log('br');
        //     return true;
        // } else
        //  if (T_top_left) {
        //     console.log('tl');
        //     return true;
        // } else if (T_top_right) {
        //     console.log('tr');
        //     return true;
        // } else {
        //     return false;
        // }
        if(T_top_left || T_top_right || T_bottom_left || T_bottom_right) { console.log('c'); return true; }
        else return false;
    }
}