import Gameboard from "../gameboard";
import Player from "../player";

function GAME(playerName) {

    const boards = [Gameboard(), Gameboard()];

    const players = [Player(playerName, boards[0], boards[1]), Player('Opponent', boards[1], boards[0])];
    
    let activePlayer = players[0];
    

    // FUNCTIONALITY
    function nextTurn() {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    // GETTERS
    function getPlayers() {
        return players;
    };

    function getBoards() {
        return boards;
    };

    function getActivePlayer() {
        return activePlayer;
    };

    return {
        getPlayers,
        getBoards,
        getActivePlayer,
        nextTurn,
    }
}

export {
    GAME,
}