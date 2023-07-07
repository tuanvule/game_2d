const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Player {
    constructor() {
        this.h = 20
        this.w = 20
        this.x = 0
        this.y = innerHeight - this.h
        this.gravity = .5
        this.velocity = {
            x: 0,
            y: 0
        }
        this.actions= {
            left: false,
            right: false,
            jump: false
        }
        this.isTouching = false
    }
    
    draw() {
        cvx.fillStyle = 'blue'
        cvx.fillRect(this.x, this.y, this.w, this.h)
    }

    update() {
        if(this.y + this.velocity.y<=innerHeight-this.h && !this.isTouching) {
            this.y += this.velocity.y

            this.velocity.y+=this.gravity
        } else {
            this.velocity.y = 0
        }

        if(this.actions.right) {
            this.velocity.x = 4
        } else if(this.actions.left) {
            this.velocity.x = -4
        }
         else {
            this.velocity.x=0
        }
        this.x += this.velocity.x
        this.draw()
    }

    action(action, state) {
        if(state === 'keydown') {
            switch (action) {
                case 'd':
                    // this.velocity.x=4
                    this.actions.right = true
                    break
                case 'a':
                    // this.velocity.x=-4
                    this.actions.left = true
                    break
                case 's':
                    this.velocity.y=innerHeight-20 - this.y >= 20 ? 20 : innerHeight-20 - this.y
                    break
                case 'w':
                    this.velocity.y=-10
                    this.isTouching = false 
                    // this.actions.jump = true
                    // console.log(this.velocity.y)
                    break
                default :
                    this.velocity = {
                        x:0,
                        y:this.gravity
                    }
            }
        }
        else if(state === 'keyup') {
            switch (action) {
                case 'd':
                    this.velocity.x=0
                    this.actions.right = false
                    break
                case 'a':
                    this.velocity.x=0
                    this.actions.left = false
                    break
                case 's':
                    this.velocity.y=innerHeight-20 - this.y >= 20 ? 20 : innerHeight-20 - this.y
                    break
                case 'w':
                    // this.actions.jump = false
                    this.velocity.y+=this.gravity
                    break
                default :
                    this.velocity = {
                        x:0,
                        y:this.gravity
                    }
            }
        }
    }

    spawnPlatform() {
        const px = this.x - 100
        const pw = 200
        const py = this.y + this.h*2
        const ph = 20

        // cvx.fillStyle = 'blue'
        // cvx.fillRect(px, py, pw, ph)
        return {
            px, pw, py, ph
        }
    }
}