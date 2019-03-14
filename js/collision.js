// let collision = {
//     horizontal(ball, obj) {
//         // checking obj.right == ball.left || obj.left == ball.right) && ball.top < obj.bottom && ball.bottom > obj.top 
//         if ((obj.position.x + obj.width >= ball.position.x - ball.radius && obj.position.x <= ball.position.x + ball.radius) && ball.position.y - ball.radius > obj.position.y && ball.position.y + ball.radius < obj.position.y + obj.height) { console.log('h'); return true; }
//         else return false;
//     },
//     vertical(ball, obj) {
//         // checking obj.top == ball.bottom || obj.bottom == ball.top) && ball.left > obj.right && ball.right < obj.left
//         if ((obj.position.y <= ball.position.y + ball.radius && obj.position.y + obj.height >= ball.position.y - ball.radius) && ball.position.x - ball.radius > obj.position.x && ball.position.x + ball.radius < obj.position.x + obj.width) { console.log('v'); return true; }
//         else return false;
//     },
//     corner(ball, obj) {
//         // checking ball.left < obj.right && ball.right > obj.left && ball.top < obj.bottom && ball.bottom > obj.top
//         if (ball.position.x - ball.radius < obj.position.x + obj.width && ball.position.x + ball.radius > obj.position.x && ball.position.y - ball.radius < obj.position.y + obj.height && ball.position.y + ball.radius > obj.position.y) return true;
//         else return false;
//     }
// }

// let collision = {
//     horizontal(ball, obj) {
//         // checking obj.right == ball.left || obj.left == ball.right) && ball.top < obj.bottom && ball.bottom > obj.top 
//         if ((obj.position.x + obj.width >= ball.position.x - ball.radius && obj.position.x <= ball.position.x + ball.radius) && ball.position.y - ball.radius > obj.position.y && ball.position.y + ball.radius < obj.position.y + obj.height) { console.log('h'); return true; }
//         else return false;
//     },
//     vertical(ball, obj) {
//         // checking obj.top == ball.bottom || obj.bottom == ball.top) && ball.left > obj.right && ball.right < obj.left
//         if ((obj.position.y <= ball.position.y + ball.radius && obj.position.y + obj.height >= ball.position.y - ball.radius) && ball.position.x - ball.radius > obj.position.x && ball.position.x + ball.radius < obj.position.x + obj.width) { console.log('v'); return true; }
//         else return false;
//     },
//     corner(ball, obj) {
//         let T_top_left = obj.position.x < ball.position.x + ball.radius &&
//                          obj.position.y < ball.position.y + ball.radius &&
//                          obj.position.x > ball.position.x &&
//                          obj.position.y > ball.position.y;

//         let T_top_right = obj.position.x + obj.width > ball.position.x - ball.radius &&
//                          obj.position.y < ball.position.y + ball.radius &&
//                          obj.position.x + obj.width < ball.position.x &&
//                          obj.position.y > ball.position.y && 1 > 2;

//         let T_bottom_left = obj.position.x < ball.position.x + ball.radius &&
//                          obj.position.y + obj.height > ball.position.y - ball.radius &&
//                          obj.position.x > ball.position.x &&
//                          obj.position.y + obj.height < ball.position.y;

//         let T_bottom_right = obj.position.x + obj.width > ball.position.x - ball.radius &&
//                          obj.position.y > ball.position.y - ball.radius &&
//                          obj.position.x + obj.width  < ball.position.x &&
//                          obj.position.y + obj.height < ball.position.y;

//             if(T_bottom_left) {
//                 console.log('bl');
//                 return true;
//             } else if(T_bottom_right) {
//                 console.log('br');
//                 return true;
//             } else if(T_top_left) {
//                 console.log('tl');
//                 return true;
//             } else if(T_top_right) {
//                 console.log('tr');
//                 return true;
//             } else {
//                 return false;
//             }
//             // if(T_top_left || T_top_right || T_bottom_left || T_top_right) { console.log('c'); return true; }
//             // else return false;
//     }
// }

let collision = {
    horizontal(ball, obj) {
        // checking obj.right == ball.left || obj.left == ball.right) && ball.top < obj.bottom && ball.bottom > obj.top 
        if ((obj.position.x + obj.width >= ball.position.x - ball.radius && obj.position.x <= ball.position.x + ball.radius) && ball.position.y >= obj.position.y && ball.position.y <= obj.position.y + obj.height) { console.log('h'); return true; }
        else return false;
    },
    vertical(ball, obj) {
        // checking obj.top == ball.bottom || obj.bottom == ball.top) && ball.left > obj.right && ball.right < obj.left
        if ((obj.position.y <= ball.position.y + ball.radius && obj.position.y + obj.height >= ball.position.y - ball.radius) && ball.position.x >= obj.position.x && ball.position.x <= obj.position.x + obj.width) { console.log('v'); return true; }
        else return false;
    },
    corner(ball, obj) {
        let T_top_left = (ball.position.x < obj.position.x && obj.position.x < ball.position.x + ball.radius) && (ball.position.y < obj.position.y && obj.position.y < ball.position.y + ball.radius);

        let T_top_right = ((ball.position.x - ball.radius) < (obj.position.x + obj.width) && (obj.position.x + obj.width) < ball.position.x) && (ball.position.y < obj.position.y && obj.position.y < (ball.position.y + ball.radius));

        let T_bottom_left = (ball.position.x < obj.position.x && obj.position.x < ball.position.x + ball.radius) && (ball.position.y - ball.radius < obj.position.y + obj.height && obj.position.y + obj.height < ball.position.y);

        let T_bottom_right = (ball.position.x - ball.radius < obj.position.x + obj.width && obj.position.x + obj.width < ball.position.x) && (ball.position.y - ball.radius < obj.position.y + obj.height && obj.position.y + obj.height < ball.position.y);

        if (T_bottom_left) {
            console.log('bl');
            return true;
        } else if (T_bottom_right) {
            console.log('br');
            return true;
        } else if (T_top_left) {
            console.log('tl');
            return true;
        } else if (T_top_right) {
            console.log('tr');
            return true;
        } else {
            return false;
        }
        // if(T_top_left || T_top_right || T_bottom_left || T_top_right) { console.log('c'); return true; }
        // else return false;
    }
    // corner (ball, obj) {
    //     if((obj.position.x + obj.width >= ball.position.x - ball.radius && obj.position.x <= ball.position.x + ball.radius) && (obj.position.y <= ball.position.y + ball.radius && obj.position.y + obj.height >= ball.position.y - ball.radius)) { console.log('c'); return true; }
    //     else return false;
    // }
}