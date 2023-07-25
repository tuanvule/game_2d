// import { io } from "https://cdn.socket.io/4.7.1/socket.io.esm.min.js";
// import {  io } from "socket.io-client";
import { Particles } from "../src/particle.js";
import { Platform } from "../src/platform.js";
import { Player } from "../src/player.js";
import { Projectile } from "../src/projectile.js";
import { isCollide } from "../util/collide.js";
import { movementActive } from "../util/movement.js";
import { Enermies } from "../src/enermies.js";
import { Trap } from "../src/trap.js";

const $ = document.querySelector.bind(document)

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

const player = new Player(100, 200, 'red', '')
// const players = {}

// const socket = io('https://multiplayergame-server.vercel.app/', {
//     // allowRequest: (req, callback) => {
//         // console.log(req.headers.origin, '===================================')
//     //     const noOriginHeader = req.headers.origin === undefined;
//     //     callback(null, noOriginHeader);
//     // },
//     // withCredentials: true,
//     // extraHeaders: {
//     //     "origin": "http://127.0.0.1:5500"
//     // },
//     // serveClient: true,
//     // transports : ['websocket'],
//     // rejectUnauthorized: true
// })

// socket.on("connect_error", (err) => {
//     console.log(err)
//     console.log('reconnect')
    // setTimeout(() => {
    //     socket.connect();
    // }, 1000);
// });

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

// socket.on('updatePlayers', (BEplayers) => {
//     // console.log('====================================')
//     for (const id in BEplayers) {
//         delete players[undefined]

//         // console.log(BEplayers[id])
//         // console.log(id)
//         if(!players[id]) {
//             // console.log(id)
//             // console.log(players)
//             players[id] = new Player(BEplayers[id].x, BEplayers[id].y, BEplayers[id].color, id)
//         } else {
//             // console.log(socket.id, )
//             if(id !== socket.id) {
//                 // console.log(id)
//                 players[id].x = BEplayers[id].x
//                 players[id].y = BEplayers[id].y
//                 console.log('something')
//                 // console.log(players[id], BEplayers[id])
//             }
//         }

//         for(let id in players) {
//             // console.log(id === undefined)
//             if(!BEplayers[id]) {
//                 delete players[id]
//             }
//         }
//     }
// })
// setInterval(() => {
//     // for (const id in players) {
//     //     console.log(id)
//     //     console.log(players[id])
//     // }
//     // console.log(socket.id)
//     if(players[socket.id]) {
//         socket.emit('updatePlayers', {
//             [socket.id]: {
//                 x: players[socket.id].x,
//                 y: players[socket.id].y,
//                 color: players[socket.id].color
//             }
//         })
//     }
// }, 15)


const platforms = [
    new Platform(200, innerHeight - 50, 800, 50),
    new Platform(400, innerHeight - 200, 50, 200),
    new Platform(450, innerHeight - 200, 300, 80),
    new Platform(900, innerHeight - 200, 200, 30),
    new Platform(1200, innerHeight - 300, 200, 30),
    new Platform(1500, innerHeight - 400, 200, 30),
    new Platform(1800, innerHeight - 400, 200, 30),
    new Platform(2000, innerHeight - 400, 200, 30),
    new Platform(2300, innerHeight - 400, 200, 30),
    new Platform(2800, innerHeight - 50, 1000, 50),
    new Platform(4800, innerHeight - 50, 500, 50),
    new Platform(5500, innerHeight - 180, 50, 180, false),
    new Platform(5800, innerHeight - 300, 50, 300, false),
    new Platform(6100, innerHeight - 180, 50, 180, false),
    new Platform(6150, innerHeight - 50, 1000, 50),
]

const traps = [
    new Trap(1000, innerHeight - 20, 1800, 20, 'lava'),
    new Trap(4000, innerHeight - 200, 100, 20, 'drop'),
    new Trap(4300, innerHeight - 250, 100, 20, 'drop'),
    new Trap(4600, innerHeight - 200, 100, 20, 'drop'),
    new Trap(3800, innerHeight - 20, 1000, 20, 'lava'),
    new Trap(5300, innerHeight - 20, 200, 20, 'lava'),
    new Trap(5550, innerHeight - 20, 250, 20, 'lava'),
    new Trap(5850, innerHeight - 20, 250, 20, 'lava'),
]

const projectiles = []

const enermies = [
    // new Enermies(600, innerHeight-50-30, '', platforms[0])
]
// const platform = new Platform(100, innerHeight - 50, 1000, 50)


// setTimeout(() => {
    // console.log(socket)
    // if(players[socket.id]) {
    //     movementActive(players[socket.id], socket)
    // }
// }, 100)

movementActive(player)

function handleVerticleCollide(platform, player) {
    if(isCollide.isLanding(player, platform)) {
        player.isLanding = true
        if (player.y - player.velocity.y >= platform.y + platform.h) {
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

    if(isCollide.isBlocked.isBlockedBottom(player, platform)) {
        player.velocity.y = 4
        return true
    }
}

let delay = 0

platforms.forEach((platform) => {
    const random = Math.round(Math.random() * 3)
    console.log(platform.isSpawn)
    if(random === 2 && platform.isSpawn) {
        enermies.push(new Enermies(platform.x + platform.w/2, platform.y - 30, '', platform))
    }
})

// traps.forEach(trap => {
//     trap.x -= 3500
// })

// platforms.forEach(platform => {
//     platform.x -= 3500
// })

// enermies.forEach(enermie => {
//     enermie.x -= 3500
// })


export function adventure(reqID) {
    // platform.update(player)
    // for (const id in players) {
    //     for(var i = 0; i < platforms.length; i++) { 

    //         if(handleHorizontalCollide(platforms[i], players[id])) {
    //             break
    //         }
    //     }
    //     for(var i = 0; i < platforms.length; i++) { 
    //         if(handleVerticleCollide(platforms[i], players[id])) {
    //             break
    //         }
    //     }
    //     for(var i = 0; i < platforms.length; i++) { 
    //         if(handleBottomCollide(platforms[i], players[id])) {
    //             break
    //         }
    //     }
    //     players[id].update(platforms, socket)
    //     platforms.forEach(platform => {
    //         platform.update(players[id])
    //     })
    
    // }
    // isPlaying=false
    cvx.save()
    cvx.scale(.5,.5)
    cvx.translate(200, 410)
    if(!player.device) {
            const device = document.querySelector('.screen').name
            player.device = device
            // platforms.forEach(platform => {
            //     if(device === 'mobile') {
            //         platform.x *= 0.5
            //         // platform.y *= 0.5
            //         platform.w *= 0.5
            //         platform.h *= 0.5
            //     }
            // })

            // traps.forEach(trap => {
            //     if(device === 'mobile') {
            //         trap.x *= 0.5
            //         // trap.y *= 0.5
            //         trap.w *= 0.5
            //         trap.h *= 0.5
            //     }
            // })

            // enermies.forEach(enermie => {
            //     if(device === 'mobile') {
            //         enermie.x *= 0.5
            //         enermie.y *= 0.5
            //         enermie.w *= 0.5
            //         enermie.h *= 0.5
            //     }
            // })
        }
        delay++
    
        for(var i = 0; i < platforms.length; i++) { 
    
            if(handleHorizontalCollide(platforms[i], player)) {
                break
            }
        }
        for(var i = 0; i < platforms.length; i++) { 
            if(handleVerticleCollide(platforms[i], player)) {
                break
            }
        }
        for(var i = 0; i < platforms.length; i++) { 
            if(handleBottomCollide(platforms[i], player)) {
                break
            }
        }
        player.update(platforms, enermies, traps, reqID)
        platforms.forEach(platform => {
            platform.update(player)
        })
    
        enermies.forEach((enermie) => {
            // console.log(enermie)
            // if(delay % 30 === 0) {
            //     enermie.isShooting = true
            // }
            enermie.update(player, projectiles, platforms)
            // enermie.shootingZone()
        })
    
        projectiles.forEach((projectile, index) => {
            projectile.update(player)
            if(isCollide.isOutOfScreen(projectile)|| projectiles.length >=10) {
                projectiles.splice(index, 1)
            } 
            platforms.forEach(platform => {
                if(isCollide.isIn(projectile, platform)) {
                    projectiles.splice(index, 1)
                }
            })
            if(isCollide.isIn(projectile, player)) {
                player.deviceHeart()
                projectiles.splice(index, 1)
            }
        })
    
        traps.forEach(trap => {
            trap.update(player, reqID)
        })
        cvx.restore()
    
}