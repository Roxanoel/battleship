function Player(name, gameboard, opponentBoard) {


    function playTurn(x, y) {
        // Error moves 
        if (x === undefined || y === undefined) { throw new Error('No coordinates passed in.')};
        if (0 > x || x > 9 || 0 > y || y > 9) { throw new Error('Coordinates out of bounds')};

        // If cell was not attempted, succesful turn + opponent receives attack
        const cell = opponentBoard.getCellFromCoords({x: x, y: y});
        if (!cell.attempted) {
            opponentBoard.receiveAttack({x: x, y: y});
            return true;
        }
        // Otherwise return false
        return false;
        }
    return {
        name,
        getGameboard() { return gameboard },
        getOpponentBoard() {return opponentBoard},
        playTurn,
    }
}



export default Player;