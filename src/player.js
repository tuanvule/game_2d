
const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Player {
    constructor(x = 300, y = (innerHeight - this.h - 100), color = 'blue', id) {
        this.h = 20
        this.w = 20
        this.x = x
        this.y = y 
        this.color = color
        this.id = id
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
        this.isLanding = false
        this.isBlocked = {
            left: false,
            right: false
        }
        this.isSpawnSoundWave = false
        this.sw_w = 0
        this.sw_h = 150
        this.sw_x = this.x+this.w*2
        this.sw_y = this.y + this.h/2 - 75
        this.delay = 0
    }
    
    draw() {
        cvx.fillStyle = this.color
        cvx.fillRect(this.x, this.y, this.w, this.h)
        if(this.isSpawnSoundWave) {
            this.spawnSoundWave()
        }
    }

    update(platforms, enermies) {
        this.delay++
        if(this.y + this.velocity.y<=innerHeight-this.h && !this.isLanding) {
            this.y += this.velocity.y * devicePixelRatio
            this.velocity.y+=this.gravity
        } else {
            this.velocity.y = 0
        }

        if(this.actions.right && !this.isBlocked.right && this.x <= innerWidth - 150) {
            this.velocity.x = 4
            // socket.emit('keydown', 'd')
        } else if(this.actions.left && !this.isBlocked.left && this.x >= 150) {
            this.velocity.x = -4
            // socket.emit('keydown', 'a')
        }
         else {
            this.velocity.x=0
        }

        this.x += this.velocity.x * devicePixelRatio

        if(this.isSpawnSoundWave && this.sw_w <= 20) {
            this.sw_w+=10
        }
        if(this.delay >= 150) {
            this.isSpawnSoundWave = false
            this.sw_w = 0
            this.delay = 0
        }

        this.sw_x = this.x+this.w*2
        this.sw_y = this.y + this.h/2 - 75

        if(this.x >= innerWidth - 150 && this.actions.right) {
            console.log('asd')
            platforms.forEach(platform => {
                platform.isMoveLeft = true
            });
            enermies.forEach(enermie => {
                enermie.isMoveLeft = true
            });
        } else {
            platforms.forEach(platform => {
                platform.isMoveLeft = false
            });
            enermies.forEach(enermie => {
                enermie.isMoveLeft = false
            });
        }
        if(this.x <= 150 && this.actions.left) {
            platforms.forEach(platform => {
                platform.isMoveRight = true
            });
            enermies.forEach(enermie => {
                enermie.isMoveRight = true
            });
        } else {
            platforms.forEach(platform => {
                platform.isMoveRight = false
            });
            enermies.forEach(enermie => {
                enermie.isMoveRight = false
            });
        }
        
        // if(this.id) {
        //     socket.emit('updatePlayers', {
        //         [this.id]: {
        //             x: this.x,
        //             y: this.y,
        //             color: this.color
        //         }
        //     })

        //     // console.log(this.id)
        // }


        this.draw()
    }

    action(action, state) {
        if(state === 'keydown') {
            switch (action) {
                case 'd':
                    // this.velocity.x=4
                    if(!this.isBlocked.right) {
                        this.actions.right = true
                    }
                    break
                case 'a':
                    // this.velocity.x=-4
                    if(!this.isBlocked.left) {
                        this.actions.left = true
                    }
                    break
                case 's':
                    this.velocity.y=innerHeight-20 - this.y >= 20 ? 20 : innerHeight-20 - this.y
                    break
                case 'w':
                    this.velocity.y=-10
                    // socket.emit('keydown', 'w')
                    this.isLanding = false 
                    // this.actions.jump = true
                    // console.log(this.velocity.y)
                    break
                case 'q':
                    if(!this.isSpawnSoundWave) {
                        this.isSpawnSoundWave = true
                    }
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
        const x = this.x - 100
        const w = 200
        const y = this.y + this.h*2
        const h = 20

        // cvx.fillStyle = 'blue'
        // cvx.fillRect(x, y, w, h)
        return {
            x, w, y, h
        }
    }

    spawnSoundWave() {
        const img = new Image()
        img.src = '../texture/soundwave.png'

        cvx.drawImage(img, 0, 0, 100, 200, this.sw_x, this.sw_y, this.sw_w, this.sw_h)
    }
}