
function isStand(item1, item2) {
    if(item1.y + item1.h <= item2.y &&
        item1.y + item1.h + item1.velocity.y >= item2.y  &&
        item1.x + item1.w >= item2.x &&
        item1.x <= item2.x + item2.w
    ) 
    {
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
        return true;
    }
}

function isLanding(item1, item2) {
    if(item1.x + item1.w > item2.x &&
        item1.x < item2.x + item2.w - 2 &&
        item1.y + item1.h + item1.velocity.y >= item2.y &&
        item1.y <= item2.y + 0.01) {
            return true;
        }
}

function isBlocked() {
    return {
        isBlockedRight(item1, item2) {
            if (
                item1.x+item1.w >= item2.x &&
                item1.x + item1.w <= item2.x+1 &&
                item1.y + item1.h >= item2.y &&
                item1.y <= item2.y + item2.h
            ) {
                return true
            }
        },
        isBlockedLeft(item1, item2) {
            if (
                item1.x <= item2.x + item2.w &&
                item1.x >= item2.x + item2.w -2 &&
                item1.y + item1.h >= item2.y &&
                item1.y <= item2.y + item2.h
            ) {
                // console.log('asd')
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