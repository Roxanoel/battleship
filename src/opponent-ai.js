function OpponentAI(oppositeBoard) {
    function getLegalMoves() {
        const allCells = oppositeBoard.getCells();
        return allCells.filter(cell => cell.attempted === false);
    };
    function getRandomLegalMove(randomiserFunction) {
        const legalMoves = getLegalMoves();
        const index = randomiserFunction(legalMoves.length);

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