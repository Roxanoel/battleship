import Ship from "./ship.js";
import convertCoordinatesToIndex from "./utils.js";

/* eslint-disable no-use-before-define */
function Gameboard() {
    const cells = generateCells(); 
    const ships = [];
    const misses = [];

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

    function getCells() {
        return cells;
    }

    function getShips() {
        return ships;
    }

    function getMisses() {
        return misses;
    }

    function shipFits(startCell, size, orientation) {
        if (orientation === 'h') {
            // Horizontal fit: col index at start + size should be less than final col index
            if (!(startCell.y + (size -1) <= 9)) return false;

            // Check if any cell in the way is occupied
            for(let i = startCell.y; i < startCell.y + size; i+=1) {
                const index = convertCoordinatesToIndex(startCell.x, i);
                if (cells[index].occupied === true) return false;
            }
            // Otherwise: 
            return true;
        }
        else if (orientation === 'v') {
            // Check for board overflow at the bottom.
            if((startCell.x + (size -1) > 9)) return false;

            // Check if any cell in the way is occupied
            for(let i = startCell.x; i < startCell.x + size; i+=1) {
                const index = convertCoordinatesToIndex(i, startCell.y);
                if (cells[index].occupied === true) return false;
            }

            // Otherwise: 
            return true;
        }
        // Error is only thrown if orientation is neither h nor v
        throw new Error('Orientation value invalid. Format = "h" or "v"');
        
    };

    function getCellFromCoords(coords) {
        return cells[convertCoordinatesToIndex(coords.x, coords.y)];
    }
    function attemptPlaceShip(startCellCoordinates, size, orientation) {
        // Get cells from coords
        const startCell = getCellFromCoords(startCellCoordinates);
        
        // Checks if ship fits; if not, early return.
        if (shipFits(startCell, size, orientation) === false) 
        return false;

        // For ship constructor
        let cellIndices = [];
        
        if (orientation === 'h') {
            // Occupy the right cells
            for(let i = startCell.y; i < startCell.y + size; i+=1) {
                // Reconstitutes index from position
                const index = convertCoordinatesToIndex(startCell.x, i);
                cells[index].occupyCell(); 
                cellIndices.push(index);
            }
            // Store ship in array
            ships.push(Ship(cellIndices));

            // Indicates success
            return true;
        } else if (orientation === 'v') {
            // Occupy the right cells
            for(let i = startCell.x; i < startCell.x + size; i+=1) {
                // Reconstitutes index from position
                const index = convertCoordinatesToIndex(i, startCell.y);
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

    function receiveAttack(cellCoordinates) {
        // Get cell from coords
        const cell = getCellFromCoords(cellCoordinates);
        
        // Early returns if this position has already been targeted.
        if (cell.attempted === true) return 'already attempted';
        cell.markAsAttempted();
        checkForHit(cells.indexOf(cell));
    };
    function checkForHit(cellIndex) {
        // Checks if there is a ship at that position
        for (let i = 0; i < ships.length; i+=1) {
            // Tries to find a match among each ship's positions
            for(let j = 0; j < ships[i].positions.length; j+=1) {
                if (ships[i].positions[j] === cellIndex) {
                    // Make ship take the hit
                    ships[i].hit(cellIndex);
                    // Return true
                    return true;
                }
            }
        }
        // If no hit was registered
        misses.push(cellIndex);
        return false;
    };
    function allSunk() {
        if (ships.length > 0) {
            return ships.every(ship => ship.isSunk());
        }
        // Will return false if no ships are placed. 
        return false;
    }

    // PUBLIC
    return {
        getCells,
        getCellFromCoords,
        getShips,
        getMisses,
        shipFits,
        attemptPlaceShip,
        receiveAttack,
        allSunk,
    }

}

export {
    Gameboard
};