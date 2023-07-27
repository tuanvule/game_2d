const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Platform {
    constructor(x, y, w, h, isSpawn = true, isCheckPoint = false) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.isMoveLeft = false
        this.isMoveRight = false
        this.isSpawn = isSpawn
        this.isCheckPoint = isCheckPoint
        this.checkPointPosition = {}
    }
    
    draw() {
        cvx.fillStyle = 'blue'
        cvx.fillRect(this.x, this.y, this.w, this.h)
        if(this.isCheckPoint) {
            this.checkPointPosition = {
                x: this.x + this.w - 50,
                y: this.y - 50,
                w: 30,
                h: 50
            }
            let gradient = cvx.createLinearGradient(this.x + this.w - 50, this.y - 50, this.x + this.w - 50 + 30, this.y - 50 + 80);
            gradient.addColorStop(0, "rgba(249, 231, 148,1)");
            gradient.addColorStop(1, "rgba(246, 190, 212,1)");
            cvx.fillStyle = gradient;
            cvx.fillRect(this.x + this.w - 50, this.y - 50, 30, 50);
            // cvx.fillStyle = 'red';
            // cvx.fillRect(this.x + this.w - 50, this.y - 50, 5, 5);
        }

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
            this.x -= 4* (1 / devicePixelRatio)
        }
        if (this.isMoveRight) {
            this.x += 4* (1 / devicePixelRatio)
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