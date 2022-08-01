import { getRandomIndex } from "./utils";

function OpponentAI(oppositeBoard) {
    function getLegalMoves() {
        const allCells = oppositeBoard.getCells();
        return allCells.filter(cell => cell.attempted === false);
    };
    function getLegalMoveCoordinates(callback) {

    };

    return {
        oppositeBoard,
        getLegalMoves,
        getLegalMoveCoordinates,
    }
};

export default OpponentAI;