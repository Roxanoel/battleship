import { getRandomIndex } from "./utils";

function OpponentAI(ownBoard, oppositeBoard) {
    
    function getLegalPlacements(shipLength, orientation) {
        const allCells = ownBoard.getCells();
        return allCells.filter(cell => ownBoard.shipFits(cell, shipLength, orientation));
    };
    
    function getRandomShipPlacement(shipLength, orientation, testCallback) {
        // Get all possible placements for a ship of this length and orientation
        const legalPlacements = getLegalPlacements(shipLength, orientation);

        let index;

        // For testing: 
        if (testCallback != undefined) {
            index = testCallback;
        } else {
            index = getRandomIndex(legalPlacements.length);
        }

        return {
            x: legalPlacements[index].x,
            y: legalPlacements[index].y,
        }

    };
    
    function getLegalMoves() {
        const allCells = oppositeBoard.getCells();
        return allCells.filter(cell => cell.attempted === false);
    };
    function getRandomLegalMove(testCallback) {
        
        const legalMoves = getLegalMoves();

        let index;
        // For testing: 
        if (testCallback != undefined) {
            index = testCallback;
        } else {
            // Intended behaviour if no callback is provided 
            index = getRandomIndex(legalMoves.length);
        }

        return {
            x: legalMoves[index].x,
            y: legalMoves[index].y,
        }
    };

    return {
        getRandomLegalMove,
        getRandomShipPlacement,
    };
};

export default OpponentAI;