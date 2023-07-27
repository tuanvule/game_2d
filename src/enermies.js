import { isCollide } from "../util/collide.js"
import { Projectile } from "./projectile.js"

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Enermies {
    constructor(x, y, type, platform) {
        this.x = x
        this.y = y
        this.h = 25
        this.w = 25
        this.type = type
        this.isShooting = false
        this.shootingZone = []
        this.zonePosition = {
            x: this.x - this.w*7,
            y: this.y - this.h*7
        }
        this.delay = 0
        this.isMoveRight = false
        this.isMoveleft = false
        this.platform = platform
        this.velocity = {
            x: 2,
            y: 2
        }
        this.mainPosition = {
            x: this.x,
            y: this.y
        }
    }

    draw() {
        cvx.fillStyle = 'black'
        cvx.fillRect(this.x, this.y, this.w, this.h)
    }

    update(player, projectiles, platforms) {
            this.shootingZone = this.createShootingZone(platforms)
            this.drawShootingZone(this.shootingZone)
            const isShoot = this.shootingZone.some(zone => {
                if(isCollide.isIn(player, zone)) {
                    this.outZoneCount = 0
                    return true
                }
            })

            if(isShoot) {
                this.isShooting = true
            } else {
                this.isShooting = false
            }

            if(this.isMoveLeft) {
                this.x -= 4 * (1 / devicePixelRatio)
                this.shootingZone.forEach(zone => {
                    zone.x -=4 * (1 / devicePixelRatio)
                })
            }
            if (this.isMoveRight) {
                this.x += 4 * (1 / devicePixelRatio)
                this.shootingZone.forEach(zone => {
                    zone.x +=4 * (1 / devicePixelRatio)
                })
            }
            

        if(this.isShooting) {
            this.delay += 1
            this.shooting(player, projectiles)
        }
        this.x+=this.velocity.x * (1 / devicePixelRatio)
        this.movement(platforms)
        this.draw()
    }

    shooting(player, projectiles) {
        if(this.delay % 40 === 0) {
            projectiles.push(new Projectile(this.x+this.w/2, this.y+this.h/2, 10, 'red', player.x+player.w/2, player.y+player.h/2, 5))
        }
    }

    createShootingZone(platforms) {
        for (var i = 0; i < 15; i++) {
            this.shootingZone[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        let newShootingZone = []
        for (let i = 0; i < this.shootingZone.length; i++) {
            for (let j = 0; j < this.shootingZone[i].length; j++) {
                // newShootingZone2.push({x: this.zonePosition.x + this.w*j, y: this.zonePosition.y + this.h*i, w: this.w, h: this.h})
                newShootingZone.push({x: this.zonePosition.x + this.w*j, y: this.zonePosition.y + this.h*i, w: this.w, h: this.h})
            }
        }

        for (let i = 0; i < newShootingZone.length; i++) {
            platforms.forEach((platform) => {
                if(newShootingZone[i] && isCollide.isIn(newShootingZone[i], platform)) {
                    newShootingZone.splice(i, 1);
                    i--
                }
            })
        }

        return newShootingZone
    }

    drawShootingZone(shootingZone) {
        shootingZone.forEach(zone => {
            cvx.fillStyle = 'pink'
            cvx.fillRect(zone.x, zone.y, zone.w, zone.h)
        })
    }

    movement(platforms) {
        let isBlocked = {
            left: false,
            right: false
        }

        platforms.forEach((platform) => {
            if(isCollide.isBlocked.isBlockedRight({x: this.x, y: this.y, w: this.w, h: this.h}, platform)) {
                isBlocked.right = true
            }
            if(isCollide.isBlocked.isBlockedLeft({x: this.x, y: this.y, w: this.w, h: this.h}, platform)) {
                isBlocked.left = true
            }
        })
        if(!this.isShooting && !this.isMoveRight && !this.isMoveLeft) {
            if(this.x + this.w < this.platform.w + this.platform.x - 5 && this.velocity.x !== -1) {
                this.velocity.x = 1
            } 
            if(this.x <= this.platform.x) {
                this.velocity.x = 1
            } else if(this.x + this.w >= this.platform.w + this.platform.x) {
                this.velocity.x = -1
            }
            if(isBlocked.right) {
                this.velocity.x = -1
            }
            if (isBlocked.left) {
                this.velocity.x = 1
            }
        } else {
            this.isMoveRight = false
            this.isMoveLeft = false
            this.velocity.x = 0
        }

        this.zonePosition = {
            x: this.x - this.w*7,
            y: this.y - this.h*7
        }
    }
}