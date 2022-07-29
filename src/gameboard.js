import Ship from "./ship";
import convertCoordinatesToIndex from "./utils";

/* eslint-disable no-use-before-define */
function Gameboard() {
    const cells = generateCells(); 

    return {
        cells,
        ships: [],
        boatFits(position, size, orientation) {
            if (orientation === 'h') {
                // Horizontal fit: col index at start + size should be less than final col index
                if (!(position.y + (size -1) <= 9)) return false;

                // Check if any cell in the way is occupied (HORIZ)
                for(let i = position.y; i < position.y + size; i+=1) {
                    if (this.cells[i].occupied === true) return false;
                }
                // Otherwise: 
                return true;
            }
            else if (orientation === 'v') {

            }
            throw new Error('Orientation value invalid. Format = "h" or "v"');
            
        },
        attemptPlaceShip(position, size, orientation) {
            // Checks if ship fits; if not, early return.
            if (this.boatFits(position, size, orientation) === false) 
            return false;
            
            // Occupy the right cells, currently only horiz
            for(let i = position.y; i < position.y + size; i+=1) {
                // Reconstitutes index from position
                const index = convertCoordinatesToIndex(position.x, i);
                this.cells[index].occupyCell();  // Doesn't work for rows other than 1st
            }
            // Store ship in array
            this.ships.push(Ship(4));

            return true;
        },
        receiveAttack(position) {
            if (position.attempted === true) return false;
            position.markAsAttempted();
            return true;
        },
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
                attempted: false,
                occupyCell() {
                    this.occupied = true;
                },
                markAsAttempted() {
                    this.attempted = true;
                },
            }
            cells.push(cell);
        }
    }

    return cells;
}

export default Gameboard;