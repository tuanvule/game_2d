const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Particles {
    constructor(x, y, r, color, x2, y2, speed) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.x2 = x2
        this.y2 = y2
        this.speed = speed
    }

    draw() {
        // console.log('asd')
        cvx.beginPath()
        cvx.fillStyle = this.color
        cvx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        cvx.fill()
        cvx.save();
    }

    update() {
        this.x += this.x2 * this.speed
        this.y += this.y2 * this.speed
        this.draw()
    }
    
    isOfscreen() {
        if(this.x + this.r > innerWidth ||
            this.x - this.r < 0 ||
            this.y + this.r > innerHeight ||
            this.y - this.r < 0
        ) {
            return true
        }
    }
}