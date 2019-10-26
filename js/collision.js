class Collision {
    constructor(game) {
        this.game = game;
    }

/***********************************************************************
    Check Collisions with Walls
************************************************************************/
    // check collision with top wall
    topWall(ball) {
        return (ball.center.y <= ball.radius);
    }
    // check collision with bottom wall
    bottomWall(ball) {
        return (ball.center.y + ball.radius >= this.game.canvas.height);
    }
    // check collision with right wall
    rightWall(ball) {
        return (ball.center.x + ball.radius >= this.game.canvas.width);
    }
    // check collision with left wall
    leftWall(ball) {
        return (ball.center.x <= ball.radius);
    }

        
/***********************************************************************
    Check Collisions with boxes
************************************************************************/
    // check collision with verticle part Of Object
    handleVerticalOfObject(ball, obj) {
        if (this.topOfObject(ball, obj)) {
            ball.center.y = obj.position.y - ball.radius - 1; // 1 is substracted to avoid circle touch the border of box.
            ball.velocity.y = - ball.velocity.y;
            // console.log('top hit');
            return true;
        }
        else if (this.bottomOfObject(ball, obj)) {
            ball.center.y = obj.position.y + obj.height + ball.radius + 1;
            ball.velocity.y = - ball.velocity.y;
            // console.log('bottom hit');
            return true;
        }
        else {
            return false;
        }
    }

    // check collision with horizontal part Of Object
    handleHorizontalOfObject(ball, obj) {
        if (this.rightOfObject(ball, obj)) {
            ball.center.x = obj.position.x + obj.width + ball.radius + 1;
            ball.velocity.x = - ball.velocity.x;
            // console.log('right hit');
            return true;
        }
        else if (this.leftOfObject(ball, obj)) {
            ball.center.x = obj.position.x - ball.radius - 1;
            ball.velocity.x = - ball.velocity.x;
            // console.log('left hit');
            return true;
        }
        else return false;
    }

    // check collision with top Of Object
    topOfObject(ball, obj) {
        return (this.vertical(ball, obj) && ball.velocity.y >= 0);
    }

    // check collision with bottom Of Object
    bottomOfObject(ball, obj) {
        return (this.vertical(ball, obj) && ball.velocity.y <= 0);
    }

    // check collision with right Of Object
    rightOfObject(ball, obj) {
        return (this.horizontal(ball, obj) && ball.velocity.x <= 0);
    }

    // check collision with left Of Object
    leftOfObject(ball, obj) {
        return (this.horizontal(ball, obj) && ball.velocity.x >= 0);
    }

    // check horizontal collision Of Object
    horizontal(ball, obj) {
        if ((obj.position.x + obj.width >= ball.center.x - ball.radius && obj.position.x <= ball.center.x + ball.radius) && ball.center.y >= obj.position.y && ball.center.y <= obj.position.y + obj.height) return true;
        else return false;
    }

    // check vertical collision Of Object
    vertical(ball, obj) {
        if ((obj.position.y <= ball.center.y + ball.radius && obj.position.y + obj.height >= ball.center.y - ball.radius) && ball.center.x >= obj.position.x && ball.center.x <= obj.position.x + obj.width) return true;
        else return false;
    }
    corner(ball, obj) {
        let T_top_left = Math.abs(obj.position.x - ball.center.x) < ball.radius && Math.abs(obj.position.y - ball.center.y) < ball.radius;

        let T_top_right = Math.abs(ball.center.x - obj.position.x - obj.width) < ball.radius && Math.abs(obj.position.y - ball.center.y) < ball.radius;

        let T_bottom_left = Math.abs(obj.position.x - ball.center.x) < ball.radius && Math.abs(ball.center.y - obj.position.y - obj.height) < ball.radius;

        let T_bottom_right = Math.abs(ball.center.x - obj.position.x - obj.width) < ball.radius && Math.abs(ball.center.y - obj.position.y - obj.height) < ball.radius;

        if (T_bottom_left) {
            // console.log('bl');
            ball.center.x = obj.position.x - ball.radius - 1;
            ball.center.y = obj.position.y + obj.height + ball.radius + 1;

            if (ball.velocity.x >= 0 && ball.velocity.y <= 0) {
                let temp_x = ball.velocity.x;
                ball.velocity.x = ball.velocity.y;
                ball.velocity.y = temp_x;
                // console.log(1);
                return true;
            } else if (ball.velocity.x >= 0 && ball.velocity.y >= 0) {
                ball.velocity.x = -ball.velocity.x;
                // console.log(2);
                return true;
            } else if (ball.velocity.x <= 0 && ball.velocity.y <= 0) {
                ball.velocity.y = - ball.velocity.y;
                // console.log(3);
                return true;
            } else {
                // console.log('bl: err');
            }
            return false;
        }
        else if (T_bottom_right) {
            // console.log('br');
            ball.center.x = obj.position.x + obj.width + ball.radius + 1;
            ball.center.y = obj.position.y + obj.height + ball.radius + 1;

            if (ball.velocity.x <= 0 && ball.velocity.y <= 0) {
                let temp_x = ball.velocity.x;
                ball.velocity.x = - ball.velocity.y;
                ball.velocity.y = - temp_x;
                // console.log(1);
                return true;
            } else if (ball.velocity.x <= 0 && ball.velocity.y >= 0) {
                ball.velocity.x = -ball.velocity.x;
                // console.log(2);
                return true;
            } else if (ball.velocity.x >= 0 && ball.velocity.y <= 0) {
                ball.velocity.y = - ball.velocity.y;
                // console.log(3);
                return true;
            } else {
                // console.log('br: err');
            }
            return false;
        }
        else if (T_top_left) {
            // console.log('tl');
            ball.center.x = obj.position.x - ball.radius - 1;
            ball.center.y = obj.position.y - ball.radius - 1;

            if (ball.velocity.x >= 0 && ball.velocity.y >= 0) {
                let temp_x = ball.velocity.x;
                ball.velocity.x = - ball.velocity.y;
                ball.velocity.y = - temp_x;
                // console.log(1);
                return true;
            } else if (ball.velocity.x >= 0 && ball.velocity.y <= 0) {
                ball.velocity.x = -ball.velocity.x;
                // console.log(2);
                return true;
            } else if (ball.velocity.x <= 0 && ball.velocity.y >= 0) {
                ball.velocity.y = - ball.velocity.y;
                // console.log(3);
                return true;
            } else {
                // console.log('tl: err');
            }
            return false;
        }
        else if (T_top_right) {
            // console.log('tr');
            ball.center.x = obj.position.x + obj.width + ball.radius + 1;
            ball.center.y = obj.position.y - ball.radius - 1;

            if (ball.velocity.x <= 0 && ball.velocity.y >= 0) {
                let temp_x = ball.velocity.x;
                ball.velocity.x = ball.velocity.y;
                ball.velocity.y = temp_x;
                // console.log(1);
                return true;
            } else if (ball.velocity.x <= 0 && ball.velocity.y <= 0) {
                ball.velocity.x = -ball.velocity.x;
                // console.log(2);
                return true;
            } else if (ball.velocity.x >= 0 && ball.velocity.y >= 0) {
                ball.velocity.y = - ball.velocity.y;
                // console.log(3);
                return true;
            } else {
                // console.log('tr: err');
            }
            return false;
        }
        else {
            return false;
        }
        // if(T_top_left || T_top_right || T_bottom_left || T_bottom_right) { console.log('c'); return true; }
        // else return false;
    }
}