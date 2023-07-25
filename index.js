import { adventure } from "./arc/adventure.js";
import { bossFight } from "./arc/boss-fight.js";
import { Boss } from "./src/boss.js";
import { Particles } from "./src/particle.js";
import { Player } from "./src/player.js";
import { Projectile } from "./src/projectile.js";

// ----setting----

let setting = {
    device: '',
}

let saveSetting

const $ = document.querySelector.bind(document)

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

const movementBody = $('.movement-body')

cv.width = innerWidth
cv.height = innerHeight

function animation() {
    console.log('somethoing')
    if(setting.device) {
        cvx.clearRect(0, 0, innerWidth, innerHeight)
        // bossFight()
        adventure(requestAnimationFrame(animation))
    }
    
}
animation()















function build(saveSetting) {
    if(saveSetting.device === 'mobile') {
        movementBody.style.display = 'block'
        console.log('asd')
    } else {
        movementBody.style.display = 'none'
    }
}

// menu setting
const mobileBtn = $('.menu_choose-device--mobile')
const pcBtn = $('.menu_choose-device--pc')
const playBtn = $('.play-btn')
const screen = $('.screen')

mobileBtn.onclick = () => {
    mobileBtn.style.backgroundColor = 'blue'
    mobileBtn.style.color = 'white'

    pcBtn.style.backgroundColor = 'white'
    pcBtn.style.color = 'black'

    setting.device = 'mobile'
    screen.name = 'mobile'
}

pcBtn.onclick = () => {
    pcBtn.style.backgroundColor = 'blue'
    pcBtn.style.color = 'white'

    mobileBtn.style.backgroundColor = 'white'
    mobileBtn.style.color = 'black'

    setting.device = 'pc'
    screen.name = 'pc'
}

playBtn.onclick = () => {
    saveSetting = setting
    console.log(saveSetting)
    console.log(Boolean(saveSetting.device))
    if(saveSetting.device) {
        build(saveSetting)
        screen.style.display = 'none'
    }
    animation()
}