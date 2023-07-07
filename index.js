import { Enermies } from "./src/enermies.js";
import { Particles } from "./src/particle.js";
import { Player } from "./src/player.js";
import { Projectile } from "./src/projectile.js";

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

cv.width = innerWidth
cv.height = innerHeight

// console.log(cvx)
let projectiles = []
let platforms = []
let enermiesAttacks = []
let particles = []

const player = new Player()
const enermies = new Enermies()
// let action = {
//     left: false,
//     right: false,
//     jump: false
// }

// function () {

// }

let explosionRare = 0
let laserRare = 0

setInterval(() => {
    explosionRare++
    laserRare++
    if(explosionRare % 3 ===0) {
        const projectile = new Projectile(enermies.x, enermies.y, 10, 'red', (player.x+(player.w/2)), (player.y+(player.h/2)), 10)
        projectiles.push({projectile: projectile, type: 'explosion'})
    } else {
        const projectile = new Projectile(enermies.x, enermies.y, 20, 'red', (player.x+(player.w/2)), (player.y+(player.h/2)), 5)
        projectiles.push({projectile: projectile, type: 'normal'})
    }
    if(laserRare % 6 === 0) {
        // laser attack
        enermies.isLaserAttack = false
        console.log('asd')
    }
    console.log(laserRare)
}, 700);


window.onkeydown = ({key}) => {
    player.action(key, 'keydown')
    if(key === 'e') {
        // console.log(player.spawnPlatform())
        platforms.push(player.spawnPlatform())
    }
}

// window.onkeydown = ({key}) => {
//     player.action(key, 'keydown')
// }

window.onkeyup = ({key}) => {
    player.action(key, 'keyup')
}

window.onclick = ({clientX, clientY}) => {
    const projectile = new Projectile((player.x+(player.w/2)), (player.y+(player.h/2)), 20, 'blue', clientX, clientY, 5)
    projectiles.push({projectile: projectile, position: {clientX, clientY}})
}

function animation() {
    cvx.clearRect(0, 0, innerWidth, innerHeight)
    enermies.draw(player)
    player.update()

    projectiles.forEach(({projectile, type}, index) => {
        projectile.update()
        if(enermies.ishited(projectile, type)) {
            enermies.update()
            projectiles.splice(index, 1)
        }
        // enermies.ishited(projectile) 
        if(projectile.isOfscreen() || projectiles.length >=10) {
            projectiles.splice(index, 1)
        }
        if(type === 'explosion' && 
            (projectile.x + projectile.r >= innerWidth ||
            projectile.x - projectile.r <= 0 ||
            projectile.y + projectile.r >= innerHeight ||
            projectile.y - projectile.r <= 0) ) {
            for(var i = 0; i <= 10; i++) {
                particles.push(new Particles(projectile.x, projectile.y, 3, 'red', Math.random() - 0.5, Math.random() - 0.5, 20))
            }
        }
    })

    particles.forEach((particle, index) => {
        particle.update()
        if(particle.isOfscreen() || particles >=10) {
            particles.splice(index, 1)
        }
    })

    platforms.forEach(({px, py, pw, ph}) => {
        if(
            player.y + player.h <= py &&
            player.y + player.h + player.velocity.y >= py  &&
            player.x + player.w >= px &&
            player.x <= px + pw
        ) {
            player.isTouching = true
        } else {
            player.isTouching = false
        }

        cvx.fillStyle = 'blue'
        cvx.fillRect(px, py, pw, ph)
    })
    // console.log(projectiles)
    if(platforms.length > 1) {
        platforms.splice(0, 1)
    }
    // enermies.attack({x: player.x, y:player.y})
    // console.log(particles)dw
    // console.log({
    //     projectiles: projectiles.length,
    //     particles:  particles.length,
    // })
    requestAnimationFrame(animation)
}

animation()