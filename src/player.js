
const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

export class Player {
    constructor(x = 300, y = (innerHeight - this.h - 100), color = 'blue', id, device) {
        this.h = 20 * (1 / devicePixelRatio)
        this.w = 20 * (1 / devicePixelRatio)
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
        this.jumpCount = 0
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
        this.hearts = document.querySelectorAll('.heart')
        this.device = device
    }
    
    draw() {
        cvx.fillStyle = this.color
        cvx.fillRect(this.x, this.y, this.w, this.h)
        if(this.isSpawnSoundWave) {
            this.spawnSoundWave()
        }
    }

    update(platforms, enermies, traps, reqID) {
        this.delay++
        if(this.y + this.velocity.y<=innerHeight-this.h && !this.isLanding) {
            this.velocity.y+=this.gravity
            this.y += this.velocity.y
        } else {
            this.jumpCount = 0
            this.velocity.y = 0
        }

        if(this.actions.right && !this.isBlocked.right && this.x <= innerWidth - 250) {
            this.velocity.x = 4
            // socket.emit('keydown', 'd')
        } else if(this.actions.left && !this.isBlocked.left && this.x >= 250) {
            this.velocity.x = -4
            // socket.emit('keydown', 'a')
        }
         else {
            this.velocity.x=0
        }

        this.x += this.velocity.x * (1 / devicePixelRatio)

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

        if(this.x >= innerWidth - 250 && this.actions.right && !this.isBlocked.right) {
            platforms.forEach(platform => {
                platform.isMoveLeft = true
            });
            enermies.forEach(enermie => {
                enermie.isMoveLeft = true
            });
            traps.forEach(enermie => {
                enermie.isMoveLeft = true
            });
        } else {
            platforms.forEach(platform => {
                platform.isMoveLeft = false
            });
            enermies.forEach(enermie => {
                enermie.isMoveLeft = false
            });
            traps.forEach(enermie => {
                enermie.isMoveLeft = false
            });
        }
        if(this.x <= 250 && this.actions.left && !this.isBlocked.left) {
            platforms.forEach(platform => {
                platform.isMoveRight = true
            });
            enermies.forEach(enermie => {
                enermie.isMoveRight = true
            });
            traps.forEach(enermie => {
                enermie.isMoveRight = true
            });
        } else {
            platforms.forEach(platform => {
                platform.isMoveRight = false
            });
            enermies.forEach(enermie => {
                enermie.isMoveRight = false
            });
            traps.forEach(trap => {
                trap.isMoveRight = false
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

        if(!document.querySelector('.heart')) {
            // console.log('eeew')
            cancelAnimationFrame(reqID)
            document.querySelector('.died_message').style.display = 'block'
        }

        if(this.device === 'mobile') {
            this.gravity = .2
        }


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
                    this.jumpCount += 1
                    if(this.jumpCount <= 2) {
                        this.velocity.y= -12 * (1 / devicePixelRatio)
                        this.y -= 2
                        this.isLanding = false 
                    }
                    // socket.emit('keydown', 'w')
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

    deviceHeart() {
        if(document.querySelector('.heart')) {
            const heartList = document.querySelector('.heart-list')
            console.log(heartList.children[heartList.children.length - 1])
            heartList.removeChild(heartList.children[heartList.children.length - 1])
        }
    }
}