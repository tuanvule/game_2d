
function isStand(item1, item2) {
    if(item1.y + item1.h <= item2.y &&
        item1.y + item1.h + item1.velocity.y >= item2.y  &&
        item1.x + item1.w >= item2.x &&
        item1.x <= item2.x + item2.w
    ) 
    {
        console.log(isStand)
        return true
    }
}

function isOutOfScreen(item1) {
    if(item1.x + item1.r >= innerWidth ||
        item1.x - item1.r <= 0 ||
        item1.y + item1.r >= innerHeight ||
        item1.y - item1.r <= 0
    )
    {
        console.log('isOutOfScreen')
        return true;
    }
}

function isLanding(item1, item2) {
    if(item1.x + item1.w > item2.x + 4 &&
        item1.x < item2.x + item2.w -4 &&
        item1.y + item1.h + item1.velocity.y + 1 >= item2.y &&
        item1.y <= item2.y) {
            console.log('landing')
            return true;
        }
}

function isBlocked() {
    return {
        isBlockedRight(item1, item2) {
            if (
                item1.x+item1.w >= item2.x &&
                item1.x + item1.w <= item2.x+4 &&
                item1.y + item1.h >= item2.y &&
                item1.y <= item2.y + item2.h
            ) {
                console.log('isBlockedRight')
                return true
            }
        },
        isBlockedLeft(item1, item2) {
            if (
                item1.x <= item2.x + item2.w &&
                item1.x >= item2.x + item2.w -4 &&
                item1.y + item1.h >= item2.y &&
                item1.y <= item2.y + item2.h
            ) {
                console.log('isBlockedLeft')
                return true
            }
        },
        isBlockedBottom(item1, item2) {
            if (
                item1.x + item1.w >= item2.x &&
                item1.x <= item2.x + item2.w &&
                item1.y + item1.velocity.y> item2.y + item2.h - 10 &&
                item1.y + item1.velocity.y <= item2.y + item2.h
                ) {
                    console.log('isBlockedBottom')
                return true
            }
        }
    }
}

function isIn(item1, item2) {
    if (
        (item1.x + item1.w > item2.x &&
            item1.x < item2.x + item2.w &&
            item1.y < item2.y + item2.h &&
            item1.y + item1.h > item2.y) ||
            (item1.x + item1.r > item2.x &&
                item1.x < item2.x + item2.w &&
                item1.y < item2.y + item2.h &&
                item1.y + item1.r > item2.y)
        ) {
            // console.log('something')
        return true
    }
}

export const isCollide = {
    isStand,
    isOutOfScreen,
    isLanding,
    isBlocked: isBlocked(),
    isIn
}