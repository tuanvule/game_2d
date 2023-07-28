import { isCollide } from "../util/collide.js"

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Trap{
    constructor(x, y, w, h, type) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.type = type
        this.isMoveLeft = false
        this.isMoveRight = false
        this.isDrop = false
        this.dropDelay = 0
        this.moveDistance = 0
    }

    draw(player) {
        if(this.type === 'lava') {
            cvx.fillStyle = 'red'
            cvx.fillRect(this.x, this.y, this.w, this.h)
        } else if(this.type === 'drop') {
            
            if(!this.isDrop) {
                cvx.fillStyle = 'blue'
                cvx.fillRect(this.x, this.y, this.w, this.h)
            }

            if(isCollide.isBlocked.isBlockedBottom(player, {x: this.x, y: this.y, w: this.w, h: this.h})) {
                this.isDrop = true
                this.dropDelay = 0
            }
            if(this.isDrop) {
                cvx.fillStyle = 'green'
                cvx.fillRect(this.x, this.y + (100 * (1 / devicePixelRatio)), this.w, this.h)
            }
            if(isCollide.isLanding(player, {x: this.x, y: this.y + (100 * (1 / devicePixelRatio)), w: this.w, h: this.h}) && this.dropDelay <= 50) {
                player.jumpCount = 0
                player.velocity.y = 0
                this.dropDelay++
            }
            if(this.dropDelay > 50) {
                this.isDrop = false
                // this.dropDelay = 0
            }
        }
    }

    update(player, isPlaying, checkPoint, platforms, enermies, traps) {
        if (this.type === 'lava') { 
            if(isCollide.isIn(player, {x: this.x, y: this.y, w: this.w, h: this.h})) {
                player.devideHeart()
                if(checkPoint) {         
                    platforms.forEach(platform => {
                        console.log('1',platform.x)
                        platform.moveDistance -= checkPoint.checkPointMoveDistance
                        platform.x -= platform.moveDistance
                        if(platform.checkPointPosition.id === checkPoint.id) {
                            console.log(platform.checkPointPosition.x)
                            checkPoint.x = platform.x + platform.w - 100
                            // platform.moveDistance = 0
                        }
                    });
                    enermies.forEach(enermie => {
                        enermie.moveDistance -= checkPoint.checkPointMoveDistance
                        enermie.x -= enermie.moveDistance
                    });
                    traps.forEach(trap => {
                        trap.moveDistance -= checkPoint.checkPointMoveDistance
                        trap.x -= trap.moveDistance
                    });
                    player.x = checkPoint.x
                    player.y = checkPoint.y
                    player.velocity.y = 0
                    player.velocity.x = 0    
                    console.log(player.x)       
                    checkPoint.checkPointMoveDistance = 0
                } else {
                    player.x = 100
                    player.y = 200
                    player.velocity.y = 0

                    platforms.forEach(platform => {
                        platform.x -= platform.moveDistance
                        platform.moveDistance = 0
                    });
                    enermies.forEach(enermie => {
                        enermie.x -= enermie.moveDistance
                        enermie.moveDistance = 0
                    });
                    traps.forEach(trap => {
                        trap.x -= trap.moveDistance
                        trap.moveDistance = 0
                    });
                }
            } 
        } else if(this.type === 'drop') {
            
        }

        if(this.isMoveLeft) {
            this.x -= 4* (1 / devicePixelRatio)
            this.moveDistance -= 4* (1 / devicePixelRatio)
        }
        if (this.isMoveRight) {
            this.x += 4* (1 / devicePixelRatio)
            this.moveDistance += 4* (1 / devicePixelRatio)
        }

        this.draw(player)
    }
}