const $ = document.querySelector.bind(document)
const moveLeft = $('.move_left')
const moveRight = $('.move_right')
const jump = $('.jump')
const shield = $('.shield')
const spawnPlatfom = $('.spawnPlatfom')


export function movementActive(player, socket) {

    // const keypress = {
    //     w: false,
    //     a: false,
    //     d: false,
    // }

    // setInterval(() => {
    //     if(keypress.w) {
    //         socket.emit('keydown', 'w')
    //     } else {
    //         // console.log(player.velocity.y)
    //         socket.emit('gravity', player.velocity.y)
    //     }
    //     if (keypress.a && !player.isBlocked.left) {
    //        socket.emit('keydown', 'a')
    //     } else {
    //         // socket.emit('moveX', player.x)
    //     }
    //     if (keypress.d && !player.isBlocked.right) {
    //         socket.emit('keydown', 'd')
    //     }else {
    //         // socket.emit('moveX', player.x)
    //     }
    // }, 15)

// ---------------------------------------------------------

    // if(socket.id) {
    //     setInterval(() => {
    //         socket.emit('gravity', player.y)
    //         socket.emit('moveX', player.x)
    //     }, 1)
    // }

    moveLeft.ontouchstart = () => {
        player.action('a', 'keydown')
    }
    moveRight.ontouchstart = () => {
        player.action('d', 'keydown')
    }
    jump.ontouchstart = () => {
        player.action('w', 'keydown')
    }
    shield.ontouchstart = () => {
        player.action('q', 'keydown')
    }
    
    moveLeft.ontouchend = () => {
        player.action('a', 'keyup')
    }
    moveRight.ontouchend = () => {
        player.action('d', 'keyup')
    }
    jump.ontouchend = () => {
        player.action('w', 'keyup')
    }
    shield.ontouchend = () => {
        player.action('q', 'keyup')
    }


    window.onkeydown = ({key}) => {
        player.action(key, 'keydown', socket)
        // console.log(key)
        // if(key === 'e') {
        //     // console.log(player.spawnPlatform())
        //     platforms.push(player.spawnPlatform())
        // }
        // console.log('asd')
        // switch (key) {
        //     case 'w':
        //         keypress[key] = true
        //         break;
        //     case 'a':
        //         keypress[key] = true
        //         break;
        //     case 'd':
        //         keypress[key] = true
        //         break;
        
        //     default:
        //         break;
        // }
    }
    
    window.onkeyup = ({key}) => {
        player.action(key, 'keyup')
        // switch (key) {
        //     case 'w':
        //         keypress[key] = false
        //         break;
        //     case 'a':
        //         keypress[key] = false
        //         break;
        //     case 'd':
        //         keypress[key] = false
        //         break;
        
        //     default:
        //         break;
        // }
    }
    
    // window.onclick = ({clientX, clientY}) => {
    //     const projectile = new Projectile((player.x+(player.w/2)), (player.y+(player.h/2)), 20, 'blue', clientX, clientY, 5)
    //     projectiles.push({projectile: projectile, position: {clientX, clientY}})
    // }
}