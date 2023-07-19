const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')
// clientX , clientY
export class Projectile {
    constructor(x, y, speed, color, clientX, clientY, r, type) {
        this.x = x
        this.y = y
        this.position = {
            x: x,
            y: y
        }
        this.r = r
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = speed
        this.color = color
        this.type = type
        this.clientX = clientX
        this.clientY = clientY
        this.direction = 1

    }
    
    draw() {
        cvx.beginPath()
        cvx.fillStyle = this.color
        cvx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        this.x+=this.velocity.x * this.speed * this.direction
        this.y+=this.velocity.y * this.speed
        cvx.fill()
    }

    update() {
        const angle = Math.atan2(
            this.clientY - this.position.y,
            this.clientX - this.position.x
        )

        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        this.draw()
    }
}