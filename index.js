import { adventure } from "./arc/adventure.js";
import { bossFight } from "./arc/boss-fight.js";
import { Boss } from "./src/boss.js";
import { Particles } from "./src/particle.js";
import { Player } from "./src/player.js";
import { Projectile } from "./src/projectile.js";

// ----setting----

let setting = {
    device: '',
    difficulty: ''
}

let saveSetting

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cv = document.querySelector('#canvas')
const cvx = cv.getContext('2d')

const movementBody = $('.movement-body')

cv.width = innerWidth
cv.height = innerHeight

let portrait = window.matchMedia("(orientation: portrait)");

portrait.addEventListener("change", function(e) {
    window.location.reload()
})

function animation() {
    if(setting.device && setting.difficulty) {
        cvx.clearRect(0, 0, innerWidth, innerHeight)
        // bossFight()
        adventure(requestAnimationFrame(animation), saveSetting)
    }
    
}
animation()















function build(saveSetting) {
    if(saveSetting.device === 'mobile') {
        movementBody.style.display = 'block'
    } else {
        movementBody.style.display = 'none'
    }
}

// menu setting
const mobileBtn = $('.menu_choose-device--mobile')
const pcBtn = $('.menu_choose-device--pc')
const playBtn = $('.play-btn')
const screen = $('.screen')
const difficultChoices = $$('.menu_choose-difficult--chosen-item')

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

difficultChoices.forEach(ele => {
    let difficulty = ele.getAttribute("data-difficulty");
    ele.onclick = () => {
        difficultChoices.forEach(ele => {
            ele.style.backgroundColor = 'white'
            ele.style.color = 'black'
        })
        setting.difficulty = difficulty
        ele.style.backgroundColor = 'blue'
        ele.style.color = 'white'
        console.log(setting)
    }
    console.log(difficulty)
});

playBtn.onclick = () => {
    saveSetting = setting
    console.log(saveSetting)
    console.log(Boolean(saveSetting.device))
    if(saveSetting.device && saveSetting.difficulty) {
        build(saveSetting)
        screen.style.display = 'none'
        animation()
    }
}