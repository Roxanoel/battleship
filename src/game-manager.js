import Player from "./player";
import Gameboard from "./gameboard";
import { PREGAME } from "./gamestates/pregame";
import { GAME } from "./gamestates/game";

const GameManager = () => {
    let currentState = PREGAME();  // Initial value

    function startGame(playerName, callbackFn) {
        if (currentState.canStartGame(playerName, callbackFn)) {
            currentState = GAME(playerName);
        }
    };

    function getCurrentState() {
        return currentState;
    };


    return {
        getCurrentState,
        startGame,

    };
};

export default GameManager;