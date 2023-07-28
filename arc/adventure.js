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

const deviceRatio = 1 / devicePixelRatio

const player = new Player(100 , 200 , 'red', '')
const respawnBtn = document.querySelector('.respawn_btn')

respawnBtn.onclick = () => {
    console.log('reload')
    if(!document.querySelector('.heart')) {
        window.location.reload()
    }
}

let checkPoint

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
    new Platform(200, innerHeight - (50 * deviceRatio), 800, 50, true, {isCheckPoint: true, id: 1}),
    new Platform(400, innerHeight - (250 * deviceRatio), 50, 200, false),
    new Platform(450, innerHeight - (200 * deviceRatio), 300, 80),
    new Platform(900, innerHeight - (200 * deviceRatio), 200, 30),
    new Platform(1200, innerHeight - (300 * deviceRatio), 200, 30),
    new Platform(1500, innerHeight - (400 * deviceRatio), 200, 30),
    new Platform(1800, innerHeight - (400 * deviceRatio), 200, 30),
    new Platform(2000, innerHeight - (400 * deviceRatio), 200, 30),
    new Platform(2300, innerHeight - (400 * deviceRatio), 200, 30),
    new Platform(2800, innerHeight - (50 * deviceRatio), 1000, 50),
    new Platform(4800, innerHeight - (50 * deviceRatio), 500, 50),
    new Platform(5500, innerHeight - (180 * deviceRatio), 50, 180, false),
    new Platform(5800, innerHeight - (300 * deviceRatio), 50, 300, false),
    new Platform(6100, innerHeight - (180 * deviceRatio), 50, 180, false),
    new Platform(6150, innerHeight - (50 * deviceRatio), 1000, 50),
]

const traps = [
    new Trap(1000, innerHeight - (20 * deviceRatio), 1800, 20, 'lava'),
    new Trap(4000, innerHeight - (200 * deviceRatio), 100, 20, 'drop'),
    new Trap(4300, innerHeight - (250 * deviceRatio), 100, 20, 'drop'),
    new Trap(4600, innerHeight - (200 * deviceRatio), 100, 20, 'drop'),
    new Trap(3800, innerHeight - (20 * deviceRatio), 1000, 20, 'lava'),
    new Trap(5300, innerHeight - (20 * deviceRatio), 200, 20, 'lava'),
    new Trap(5550, innerHeight - (20 * deviceRatio), 250, 20, 'lava'),
    new Trap(5850, innerHeight - (20 * deviceRatio), 250, 20, 'lava'),
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

// traps.forEach(trap => {
//     trap.x -= 3500
// })

// platforms.forEach(platform => {
//     platform.x -= 3500
// })

// enermies.forEach(enermie => {
//     enermie.x -= 3500
// })

export function adventure(reqID, { difficulty }) {

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

    if(enermies.length === 0) {
        let spawnRare
        switch (difficulty) {
            case 'easy':
                spawnRare = 4
                break;
            case 'normal':
                spawnRare = 3
                break;
            case 'hard':
                spawnRare = 2
                break;
            case 'demon':
                spawnRare = 1
                break;
            default:
                break;
        }
        console.dir(document.querySelector('.heart-list'))

        for (let index = 0; index < spawnRare; index++) {
            let heartlist = document.querySelector('.heart-list')
            heartlist.innerHTML += `<image class="heart" src="./texture/heart.png"/>`
        }

        platforms.forEach((platform) => {
            const random = Math.round(Math.random() * spawnRare)
            console.log(random)
            if(random === 1 && platform.isSpawn) {
                enermies.push(new Enermies(platform.x + platform.w/2, (devicePixelRatio >= 2 ? platform.y - 25 * deviceRatio : platform.y - 25), '', platform))
            }
        })
    }

    cvx.save()
    let device = document.querySelector('.screen').name
    player.device = device
    // if(device === 'mobile') {
        // cvx.scale(.5,.5)
        // cvx.translate(0, innerHeight)
    // }
    if(device === 'mobile' && delay === 0) {
        // console.log([asd])
        platforms.forEach(platform => {
            if(device === 'mobile') {
                platform.w *= 1 / devicePixelRatio
                platform.h *= 1 / devicePixelRatio
                platform.x *= 1 / devicePixelRatio
                // platform.y *= 1 / devicePixelRatio
            }
        })

        traps.forEach(trap => {
            if(device === 'mobile') {
                trap.w *= 1 / devicePixelRatio
                trap.h *= 1 / devicePixelRatio
                trap.x *= 1 / devicePixelRatio
                // trap.y *= 1 / devicePixelRatio
            }
        })

        enermies.forEach(enermie => {
            if(device === 'mobile') {
                enermie.w *= 1 / devicePixelRatio
                enermie.h *= 1 / devicePixelRatio
                enermie.x *= 1 / devicePixelRatio
                // enermie.y *= 1 / devicePixelRatio
            }
        })
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
        platforms.forEach(platform => {
            if(platform.checkPoint.isCheckPoint) {
                let checkPointPosition = platform.checkPointPosition
                if(isCollide.isIn(player, checkPointPosition, true)){ 
                    checkPoint = platform.checkPointPosition
                }
            }
            platform.update(player, checkPoint)
        })
    
        enermies.forEach((enermie) => {
            // console.log(enermie)
            // if(delay % 30 === 0) {
            //     enermie.isShooting = true
            // }
            enermie.update(player, projectiles, platforms, difficulty)
            // enermie.shootingZone()
        })
    
        projectiles.forEach((projectile, index) => {
            projectile.update(player)
            if(isCollide.isOutOfScreen(projectile)|| projectiles.length >=10) {
                console.log('qweqwe1')
                projectiles.splice(index, 1)
            } 
            platforms.forEach(platform => {
                if(isCollide.isIn(projectile, platform)) {
                    console.log('qweqwe2')
                    projectiles.splice(index, 1)
                }
            })
            if(isCollide.isIn(projectile, player)) {
                console.log('qweqwe3')
                player.devideHeart()
                projectiles.splice(index, 1)
            }
        })
    
        traps.forEach(trap => {
            trap.update(player, reqID, checkPoint, platforms, enermies, traps)
        })
        player.update(platforms, enermies, traps, reqID, difficulty)

        cvx.restore()
    console.log(projectiles)
}