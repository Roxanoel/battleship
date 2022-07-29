/* eslint-disable no-use-before-define */
function Ship(positions) {
    return {
        positions,
        length: positions.length,
        hits: [],
        hit(position) {
            // Only adds hit to the array if it is not already present.
            if (!(this.hits.includes(position)))
            this.hits.push(position);
        },
        isSunk() {
            return(this.hits.length === this.length);
        },
    }
}


export default Ship;