import Player from "./player";
import Gameboard from "./gameboard";

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


    // GAME STATES

    function PREGAME() {
        function canStartGame(playerName, callbackFn) {
            // Do nothing (for now) if name is not provided.
            if (playerName === '') return false;
    
            // For testing
            if (callbackFn) { 
                callbackFn();
                return false;
            } 
    
            return true;
        };
    
        return {
            canStartGame,
        }
    }

    function GAME(playerName) {

        const boards = [Gameboard(), Gameboard()];
    
        const players = [Player(playerName, boards[0], boards[1]), Player('Opponent', boards[1], boards[0])];
        
        let activePlayer = players[0];
        
    
        // FUNCTIONALITY
        function nextTurn() {
            activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
        };
    
        function handleCoordinates(x, y) {
            if (activePlayer.playTurn(x, y)) {
                nextTurn();
            };
        }
    
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
            handleCoordinates,
            nextTurn,
        }
    }
    return {
        getCurrentState,
        startGame,
    };
};

export default GameManager;