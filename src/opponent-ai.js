function OpponentAI(oppositeBoard) {
    function getLegalMoves() {
        const allCells = oppositeBoard.getCells();
        return allCells.filter(cell => cell.attempted === false);
    };

    return {
        oppositeBoard,
        getLegalMoves,
    }
};

export default OpponentAI;