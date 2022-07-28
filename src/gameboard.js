import Ship from "./ship";

/* eslint-disable no-use-before-define */
function Gameboard() {
    const cells = generateCells(); 

    return {
        cells,
        ships: [],
        boatFits(position, size) {
            // Horizontal fit: col index at start + size should be less than final col index
            if (!(position.y + (size -1) <= 9)) return false;
            // Check if any cell in the way is occupied 
            for(let i = position.y; i < position.y + size; i+=1) {
                if (this.cells[i].occupied === true) return false;
            }
            return true;
        },
        attemptPlaceShip(position, size) {
            if (this.boatFits(position, size) === false) 
            return false;
            
            // Intended to work for horizontal only rn, a bit brute force, will absolutely need refactor to work with vertical
            for(let i = position.y; i < position.y + size; i+=1) {
                this.cells[i].occupyCell();
            }
            // Store ship in array
            this.ships.push(Ship(4));

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
                occupyCell() {
                    this.occupied = true;
                },
            }
            cells.push(cell);
        }
    }

    return cells;
}

export default Gameboard;