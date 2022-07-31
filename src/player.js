function Player(name, gameboard, opponentBoard) {

    return {
        name,
        getGameboard() { return gameboard },
        getOpponentBoard() {return opponentBoard},
        playTurn(x, y) {
        if (x === undefined || y === undefined) { throw new Error('No coordinates passed in.')};
        if (0 > x || x > 9 || 0 > y || y > 9) { throw new Error('Coordinates out of bounds')};

        return true; // for now
        }
    }
}



export default Player;