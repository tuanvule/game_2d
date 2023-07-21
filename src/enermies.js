import { isCollide } from "../util/collide.js"
import { Projectile } from "./projectile.js"

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Enermies {
    constructor(x, y, type, platform) {
        this.x = x
        this.y = y
        this.h = 30
        this.w = 30
        this.type = type
        this.isShooting = false
        this.shootingZone = []
        this.zonePosition = {
            x: this.x - this.w*5,
            y: this.y - this.h*5
        }
        this.delay = 0
        this.isMoveRight = false
        this.isMoveleft = false
        this.platform = platform
    }

    draw() {
        cvx.fillStyle = 'black'
        cvx.fillRect(this.x, this.y, this.w, this.h)
    }

    update(player, projectiles, platforms) {
        if(!this.shootingZone.length) {
            this.shootingZone = this.createShootingZone(platforms)
        } else {
            // this.drawShootingZone(this.shootingZone)
            const isShoot = this.shootingZone.some(zone => {
                if(isCollide.isIn(player, zone)) {
                    return true
                }
            })

            if(isShoot) {
                this.isShooting = true
            } else {
                this.isShooting = false
            }

            if(this.isMoveLeft) {
                this.x -= 4
                this.shootingZone.forEach(zone => {
                    zone.x -=4
                })
            }
            if (this.isMoveRight) {
                this.x += 4
                this.shootingZone.forEach(zone => {
                    zone.x +=4
                })
            }
        }

        if(this.isShooting) {
            this.delay += 1
            this.shooting(player, projectiles)
        }

        this.draw()
    }

    shooting(player, projectiles) {
        if(this.delay % 40 === 0) {
            projectiles.push(new Projectile(this.x+this.w/2, this.y+this.h/2, 5, 'red', player.x+player.w/2, player.y+player.h/2, 5))
        }
    }

    createShootingZone(platforms) {
        for (var i = 0; i < 11; i++) {
            this.shootingZone[i] = [1,1,1,1,1,1,1,1,1,1,1];
        }
        let newShootingZone = []
        for (let i = 0; i < this.shootingZone.length; i++) {
            for (let j = 0; j < this.shootingZone[i].length; j++) {
                newShootingZone.push({x: this.zonePosition.x + this.w*j, y: this.zonePosition.y + this.h*i, w: this.w, h: this.h})
            }
        }

        for (let i = 0; i < newShootingZone.length; i++) {
            platforms.forEach((platform) => {
                if(isCollide.isIn(newShootingZone[i], platform)) {
                    newShootingZone.splice(i, 1);
                    i--
                }
            })
        }
        return newShootingZone
    }

    // drawShootingZone(shootingZone) {
    //     shootingZone.forEach(zone => {
    //         cvx.fillStyle = 'pink'
    //         cvx.fillRect(zone.x, zone.y, zone.w, zone.h)
    //     })
    // }
}