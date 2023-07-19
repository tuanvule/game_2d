import { io } from "https://cdn.socket.io/4.7.1/socket.io.esm.min.js";
import { Particles } from "../src/particle.js";
import { Platform } from "../src/platform.js";
import { Player } from "../src/player.js";
import { Projectile } from "../src/projectile.js";
import { isCollide } from "../util/collide.js";
import { movementActive } from "../util/movement.js";

const $ = document.querySelector.bind(document)

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

// const player = new Player(100, 200, 'red')
const players = {}

const socket = io.connect('https://multiplayergame-server.vercel.app/', {
    allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader);
      }
})


// socket.emit('connection', (a) => {
//     console.log(a)
// })
// if(socket.id) {
//     socket.emit('updatePlayers', {
//         [socket.id]: {
//             x: player.x,
//             y: player.y,
//             color: player.color
//         }
//     })
//     console.log(socket.id)
// }

socket.on('updatePlayers', (BEplayers) => {
    // console.log(first)
    for (const id in BEplayers) {
        delete players[undefined]

        // console.log(BEplayers[id])
        // console.log(id)
        if(!players[id]) {
            // console.log(id)
            // console.log(players)
            players[id] = new Player(BEplayers[id].x, BEplayers[id].y, BEplayers[id].color, id)
        } else {
            // console.log(socket.id, )
            if(id !== socket.id) {
                // console.log(id)
                players[id].x = BEplayers[id].x
                players[id].y = BEplayers[id].y
                console.log('something')
                // console.log(players[id], BEplayers[id])
            }
        }

        for(let id in players) {
            // console.log(id === undefined)
            if(!BEplayers[id]) {
                delete players[id]
            }
        }
    }
})
setInterval(() => {
    // for (const id in players) {
    //     console.log(id)
    //     console.log(players[id])
    // }
    console.log(socket)
    if(players[socket.id]) {
        socket.emit('updatePlayers', {
            [socket.id]: {
                x: players[socket.id].x,
                y: players[socket.id].y,
                color: players[socket.id].color
            }
        })
    }
}, 15)


const platforms = [
    new Platform(200, innerHeight - 50, 10000, 50),
    new Platform(400, innerHeight - 350, 50, 300),
    new Platform(450, innerHeight - 200, 300, 80),
    new Platform(900, innerHeight - 200, 200, 30),
    new Platform(1200, innerHeight - 300, 200, 30),
    new Platform(1500, innerHeight - 400, 200, 30),
    new Platform(1800, innerHeight - 400, 200, 30),
    new Platform(2000, innerHeight - 400, 200, 30),
    new Platform(2300, innerHeight - 400, 200, 30),

]
// const platform = new Platform(100, innerHeight - 50, 1000, 50)


setTimeout(() => {
    console.log(socket)
    movementActive(players[socket.id], socket)
}, 100)



function handleVerticleCollide(platform, player) {
    if(isCollide.isLanding(player, platform)) {
        player.isLanding = true
        if (player.y - player.velocity.y >= platform.y + platform.h) {
            console.log(123)
            player.y += platform.y + platform.h - player.y + 1
        }
        
        return true
    }else {
        player.isLanding = false
    }
}

function handleHorizontalCollide(platform, player) {
    if(isCollide.isBlocked.isBlockedRight(player, platform)) {
        player.isBlocked.right = true
        return true
    } else {
        player.isBlocked.right = false
    }
    if(isCollide.isBlocked.isBlockedLeft(player, platform)) {
        player.isBlocked.left = true
        return true
    }else {
        player.isBlocked.left = false
    }
}

function handleBottomCollide(platform, player) {
    // console.log('somethiung')
    // console.log(player, platform)

    if(isCollide.isBlocked.isBlockedBottom(player, platform)) {
        player.velocity.y = 4
        return true
    }
}
console.dir(socket)

export function adventure() {
    // platform.update(player)
    for (const id in players) {
        for(var i = 0; i < platforms.length; i++) { 

            if(handleHorizontalCollide(platforms[i], players[id])) {
                break
            }
        }
        for(var i = 0; i < platforms.length; i++) { 
            if(handleVerticleCollide(platforms[i], players[id])) {
                break
            }
        }
        for(var i = 0; i < platforms.length; i++) { 
            if(handleBottomCollide(platforms[i], players[id])) {
                break
            }
        }
        players[id].update(platforms, socket)
        platforms.forEach(platform => {
            platform.update(players[id])
        })
    
    }
    platforms.forEach(platform => {
        if (platform.isMoveRight) {
            platform.x += 4
        }
    })
    // console.log(players)

    // for(var i = 0; i < platforms.length; i++) { 

    //     if(handleHorizontalCollide(platforms[i], player)) {
    //         break
    //     }
    // }
    // for(var i = 0; i < platforms.length; i++) { 
    //     if(handleVerticleCollide(platforms[i], player)) {
    //         break
    //     }
    // }
    // for(var i = 0; i < platforms.length; i++) { 
    //     if(handleBottomCollide(platforms[i], player)) {
    //         break
    //     }
    // }
    // player.update(platforms, socket)
    // platforms.forEach(platform => {
    //     platform.update(player)
    // })
}