/* eslint-disable no-use-before-define */
function Ship(length) {
    return {
        length,
        hits: initializeHitArray(length),
        hit(index) {
            this.hits[index] = true;
        },
        isSunk() {
            return(this.hits.every(elem => elem === true));
        },
    }
}

function initializeHitArray(length) {
    const hitArray = [];
    for(let i = 0; i < length; i+=1) {
        hitArray.push(false);
    }
    return hitArray;
}

export default Ship;