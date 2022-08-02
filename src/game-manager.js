import Player from "./player";
import Gameboard from "./gameboard";
import { PREGAME } from "./gamestates/pregame";

const GameManager = () => {
    let currentState = PREGAME();  // Initial value

    let players = [];
    let boards = [];
    let activePlayer;

    function startGame(playerName, callbackFn) {
        if (currentState.canStartGame(playerName, callbackFn)) {
            currentState = GAME();
            initialiseGame(playerName);
        }
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