import { getRandomIndex } from "./utils";

function OpponentAI(ownBoard, oppositeBoard) {
    
    function getLegalPlacements(shipLength, orientation) {
        const allCells = ownBoard.getCells();
    };
    
    function getRandomShipPlacement(shipLength, orientation, testCallback) {

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