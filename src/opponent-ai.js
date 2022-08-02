import { getRandomIndex } from "./utils";

function OpponentAI(oppositeBoard) {
    function getLegalMoves() {
        const allCells = oppositeBoard.getCells();
        return allCells.filter(cell => cell.attempted === false);
    };
    function getRandomLegalMove() {
        const legalMoves = getLegalMoves();
        const index = getRandomIndex(legalMoves.length);

        return {
            x: legalMoves[index].x,
            y: legalMoves[index].y,
        }
    };

    return {
        getRandomLegalMove,
    }
};

export default OpponentAI;