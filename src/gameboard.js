import Ship from "./ship";
import convertCoordinatesToIndex from "./utils";

/* eslint-disable no-use-before-define */
function Gameboard() {
    const cells = generateCells(); 

    const ships = [];

    function shipFits(position, size, orientation) {
        if (orientation === 'h') {
            // Horizontal fit: col index at start + size should be less than final col index
            if (!(position.y + (size -1) <= 9)) return false;

            // Check if any cell in the way is occupied
            for(let i = position.y; i < position.y + size; i+=1) {
                const index = convertCoordinatesToIndex(position.x, i);
                if (cells[index].occupied === true) return false;
            }
            // Otherwise: 
            return true;
        }
        else if (orientation === 'v') {
            // Check for board overflow at the bottom.
            if((position.x + (size -1) > 9)) return false;

            // Check if any cell in the way is occupied
            for(let i = position.x; i < position.x + size; i+=1) {
                const index = convertCoordinatesToIndex(i, position.y);
                if (cells[index].occupied === true) return false;
            }

            // Otherwise: 
            return true;
        }
        // Error is only thrown if orientation is neither h nor v
        throw new Error('Orientation value invalid. Format = "h" or "v"');
        
    };
    function attemptPlaceShip(position, size, orientation) {
        // Checks if ship fits; if not, early return.
        if (shipFits(position, size, orientation) === false) 
        return false;

        // For ship constructor
        let cellIndices = [];
        
        if (orientation === 'h') {
            // Occupy the right cells
            for(let i = position.y; i < position.y + size; i+=1) {
                // Reconstitutes index from position
                const index = convertCoordinatesToIndex(position.x, i);
                cells[index].occupyCell(); 
                cellIndices.push(index);
            }
            // Store ship in array
            ships.push(Ship(cellIndices));

            // Indicates success
            return true;
        } else if (orientation === 'v') {
            // Occupy the right cells
            for(let i = position.x; i < position.x + size; i+=1) {
                // Reconstitutes index from position
                const index = convertCoordinatesToIndex(i, position.y);
                cells[index].occupyCell(); 
                cellIndices.push(index);
            }
            // Store ship in array
            ships.push(Ship(cellIndices));

            // Indicates success
            return true;
        }
        // Error is only thrown if orientation is neither h nor v
        throw new Error('Orientation value invalid. Format = "h" or "v"');
    };

    function receiveAttack(position) {
        // Early returns if this position has already been targeted.
        if (position.attempted === true) return 'already attempted';
        position.markAsAttempted();
        checkForHit(cells.indexOf(position));
    };
    function checkForHit(positionIndex) {
        // Checks if there is a ship at that position
        for (let i = 0; i < ships.length; i+=1) {
            // Tries to find a match among each ship's positions
            for(let j = 0; j < ships[i].positions.length; j+=1) {
                if (ships[i].positions[j] === positionIndex) {
                    // Make ship take the hit
                    ships[i].hit(positionIndex);
                    // Return true
                    return true;
                }
            }
        }
        // If no hit was registered
        return false;
    };

    // PUBLIC
    return {
        cells,
        ships,
        attemptPlaceShip,
        receiveAttack,
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