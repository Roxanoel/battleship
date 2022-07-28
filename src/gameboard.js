/* eslint-disable no-use-before-define */
function Gameboard() {
    const cells = generateCells();

    return {
        cells,
    }
}

function generateCells() {
    const cells = [];

    // Creating each row
    for(let i = 0; i < 10; i+=1) {
        // Creating each col    
        for(let j = 0; j< 10; j+=1) {
            // create the cell with the right dataset elements. 
            const cell = {
                x: i,
                y: j,
                occupied: false,
            }
            cells.push(cell);
        }
    }

    return cells;
}

module.exports = Gameboard;