
import { Boss } from "../src/boss.js";
import { Particles } from "../src/particle.js";
import { Player } from "../src/player.js";
import { Projectile } from "../src/projectile.js";
import { isCollide } from "../util/collide.js";
import { movementActive } from "../util/movement.js";

const $ = document.querySelector.bind(document)

const cv = $('#canvas')
const cvx = cv.getContext('2d')

let setting = {
    device: '',
}

let saveSetting

const movementBody = $('.movement-body')

cv.width = innerWidth
cv.height = innerHeight

// console.log(cvx)
let projectiles = []
let platforms = []
// let BossAttacks = []
let particles = []

const player = new Player()
const boss = new Boss()

let explosionRare = 0
let laserRare = 0

// movementActive(player, platforms)

setInterval(() => {
    explosionRare++
    laserRare++
    if(explosionRare % 5 ===0) {
        const projectile = new Projectile(boss.x, boss.y, 10, 'red', (player.x+(player.w/2)), (player.y+(player.h/2)), 10)
        projectiles.push({projectile: projectile, type: 'explosion'})
    } else {
        const projectile = new Projectile(boss.x, boss.y, 20, 'red', (player.x+(player.w/2)), (player.y+(player.h/2)), 5)
        projectiles.push({projectile: projectile, type: 'normal'})
    }
    if(laserRare % 6 === 0) {
        // laser attack
        boss.isLaserAttack = false
    }
}, 700);




export function bossFight() {
    player.update()
    boss.draw(player)

    projectiles.forEach(({projectile, type}, index) => {
        projectile.update()
        if(boss.ishited(projectile, type)) {
            boss.update()
            projectiles.splice(index, 1)
        }
        if(isCollide.isOutOfScreen(projectile)|| projectiles.length >=10) {
            projectiles.splice(index, 1)
        }
        if(type === 'explosion' && isCollide.isOutOfScreen(projectile) ) {
            for(var i = 0; i <= 10; i++) {
                particles.push(new Particles(projectile.x, projectile.y, 3, 'red', Math.random() - 0.5, Math.random() - 0.5, 20))
            }
        }
        if(projectile.x + projectile.r <= player.sw_x + player.sw_w && 
            projectile.x + projectile.r >= player.sw_x &&
            projectile.y + projectile.r >= player.sw_y &&
            projectile.y <= player.sw_y + player.sw_h 
            ) {
            if(type === 'explosion') {
                for(var i = 0; i <= 10; i++) {
                    particles.push(new Particles(projectile.x, projectile.y, 3, 'red', Math.random() - 0.5, Math.random() - 0.5, 20))
                    projectiles.splice(index, 1)
                }
            } else {
                projectile.direction = -1
            }
        }
    })

    particles.forEach((particle, index) => {
        particle.update()
        if(particle.isOfscreen() || particles.length >=10) {
            particles.splice(index, 1)
        }
    })

    platforms.forEach((platform) => {
        const {x,y,w,h} = platform

        if(
            isCollide.isStand(player, platform)
        ) {
            player.isLanding = true
        } else {
            player.isLanding = false
        }

        cvx.fillStyle = 'blue'
        cvx.fillRect(x,y,w,h)
    })
    // console.log(projectiles)
    if(platforms.length > 1) {
        platforms.splice(0, 1)
    }
}