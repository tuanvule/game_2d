const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Platform {
    constructor(x, y, w, h) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.isMoveLeft = false
        this.isMoveRight = false
    }
    
    draw() {
        cvx.fillStyle = 'blue'
        cvx.fillRect(this.x, this.y, this.w, this.h)

        // cvx.fillStyle = 'black'
        // cvx.fillRect(this.hp_x, this.hp_y, innerWidth - this.hp_x*2, this.hp_h)
        // cvx.fillStyle = 'red'
        // cvx.fillRect(this.hp_x, this.hp_y, this.hp_w, this.hp_h)
    }

    update(player) {
        
        // if(this.hp_w - 40 <= 0) {
        //     this.hp_w = 0
        // } else {
        //     console.log('asd')
        //     this.hp_w -=40
        // }
        if(this.isMoveLeft) {
            this.x -= 4
        } else {
            this.x = this.x
        }
        if (this.isMoveRight) {
            this.x += 4
        }
        this.hp = (this.hp_w / (innerWidth - this.hp_x*2)) * 100
        this.draw()
    }

    ishited(projectile) {
        // console.log(projectile)
        if(projectile.x + projectile.r >= this.x &&
            projectile.x <= this.x+this.w &&
            projectile.y + projectile.r > this.y
            ||
            projectile.y + projectile.r >= this.h &&
            projectile.y <= this.y> this.h
        ) 
        {
            // console.log('hit')
            return true
        }
    }
}