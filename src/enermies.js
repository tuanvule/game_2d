import { Particles } from "./particle.js"

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Enermies {
    constructor() {
        this.w = 400
        this.h = 400
        this.x = cv.width - this.w
        this.y = cv.height - this.h
        this.hp_x = 200
        this.hp_y = 20
        this.hp_w = innerWidth - this.hp_x*2
        this.hp_h = 10
        this.hp = 100
        this.attack_position = {
            x: this.x,
            y: this.y
        }
        this.attack_velocity = {
            x: 0,
            y: 0
        }
        this.attack_speed = 10
        this.attack_r = 10
        this.isRotate = true
        this.isLaserAttack = false
        this.target_position = {
            x: 0,
            y: 0
        }
        this.laser_speed = 5
        this.laser_h = 5
        this.laser_w = -2000
        this.delay = 0
        this.isFire = false
        this.red = 60
    }
    
    draw(player) {
        this.attack(player)

        cvx.fillStyle = 'blue'
        cvx.fillRect(this.x, this.y, this.w, this.h)

        cvx.fillStyle = 'black'
        cvx.fillRect(this.hp_x, this.hp_y, innerWidth - this.hp_x*2, this.hp_h)
        cvx.fillStyle = 'red'
        cvx.fillRect(this.hp_x, this.hp_y, this.hp_w, this.hp_h)
    }

    update() {
        
        if(this.hp_w - 40 <= 0) {
            this.hp_w = 0
        } else {
            console.log('asd')
            this.hp_w -=40
        }
        this.hp = (this.hp_w / (innerWidth - this.hp_x*2)) * 100
        // this.draw()
    }

    ishited(projectile, type) {
        if((projectile.x + projectile.r >= this.x &&
            projectile.x <= this.x+this.w &&
            projectile.y + projectile.r > this.y
            ||
            projectile.y + projectile.r >= this.h &&
            projectile.y <= this.y> this.h
            )
            && !(type === 'explosion')
        ) 
        {
            // console.log('hit')
            return true
        }
    }
    attack({w,h, x, y}) {
        // console.log(first)
        // console.log(new Particles())
        // console.log(this.attack_velocity)
        // const angle = Math.atan2(
        //     y - this.y,
        //     x - this.x
        // )

        // this.attack_velocity = {
        //     x: Math.cos(angle),
        //     y: Math.sin(angle)
        // }

        // cvx.beginPath()
        // cvx.fillStyle = 'red'
        // cvx.arc(this.attack_position.x, this.attack_position.y, this.attack_r, 0, 2*Math.PI)
        // this.attack_position.x+=this.attack_velocity.x * this.attack_speed
        // this.attack_position.y+=this.attack_velocity.y * this.attack_speed
        // cvx.fill()
        this.delay+=1

        if(!this.isLaserAttack) {
            this.target_position = {
                x: innerWidth - this.w - x - w/2,
                y: innerHeight - this.y - (innerHeight - y) + h/2
            }

            this.laser_h = 5
            // this.isStop = false
            this.delay = 0
            this.red = 60
            // console.log(Math.atan2(this.target_position.y, this.target_position.x) * (180 / Math.PI))
        }
        
        if(this.red > 254) {
            this.red = 253
        }

        if (this.laser_h <= 50 && this.delay >= 80 && this.delay <= 120) {
            this.laser_h += this.laser_speed
            this.red+=15
        } else if (this.delay >= 150) {
            this.laser_h = 0
        }

        var angle = Math.atan2(this.target_position.y, this.target_position.x)

        cvx.save();
        cvx.translate(this.x, this.y)
        cvx.rotate(-angle)
        cvx.fillStyle = `rgb(${this.red}, 0, 0)`
        cvx.fillRect(0, -1, this.laser_w, this.laser_h)
        cvx.fillRect(0, 0, this.laser_w, -this.laser_h)
        cvx.restore();

        this.isLaserAttack = true
    }
}