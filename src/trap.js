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

    update(player, isPlaying) {
        if (this.type === 'lava') {
            if(isCollide.isStand(player, {x: this.x, y: this.y, w: this.w, h: this.h})) {
                player.deviceHeart()
            } 
        } else if(this.type === 'drop') {
            
        }

        if(this.isMoveLeft) {
            this.x -= 4* (1 / devicePixelRatio)
        }
        if (this.isMoveRight) {
            this.x += 4* (1 / devicePixelRatio)
        }

        this.draw(player)
    }
}