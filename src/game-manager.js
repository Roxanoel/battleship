import Player from "./player";
import Gameboard from "./gameboard";

const GameManager = () => {
    const gameStates = ['PREGAME', 'GAME', 'POSTGAME'];

    let currentState = gameStates[0];

    let players = [];
    let boards = [];
    let activePlayer;

    function startGame(playerName, callbackFn) {
        // Do nothing (for now) if name is not provided.
        if (playerName === '') return;

        // For testing
        if (callbackFn) { 
            callbackFn();
            return;
        } 

        // Otherwise, default behaviour (will need a refactor after testing)
        currentState = gameStates[1];
        initialiseGame(playerName);
    };

    function initialiseGame(playerName) {
        boards = [Gameboard(), Gameboard()];

        players = [Player(playerName, boards[0], boards[1]), Player('Opponent', boards[1], boards[0])];
        activePlayer = players[0];
    };

    function nextTurn() {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    function getCurrentState() {
        return currentState;
    };

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
        getCurrentState,
        startGame,
        getPlayers,
        getBoards,
        getActivePlayer,
        nextTurn,
    };
};

export default GameManager;