function Player(name, gameboard, opponentBoard) {
    return {
        name,
        getGameboard() { return gameboard },
        getOpponentBoard() {return opponentBoard},

    }
}

export default Player;