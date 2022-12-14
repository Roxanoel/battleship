import Player from "./player";
import Gameboard from "./gameboard";

const GameManager = () => {
    let currentState = PREGAME();  // Initial value

    function getCurrentState() {
        return currentState;
    };


    // GAME STATES

    function PREGAME() {
        function startGame(playerName, callbackFn) {
            if (canStartGame(playerName, callbackFn)) {
                currentState = GAME(playerName);
            }
        };

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
            startGame,
        }
    }

    function GAME(playerName) {

        const boards = [Gameboard(), Gameboard()];
    
        const players = [Player(playerName, boards[0], boards[1]), Player('Opponent', boards[1], boards[0])];
        
        let activePlayer = players[0];
        
        let aiTurnCount = 0;
    
        // FUNCTIONALITY
        function nextTurn() {
            // Check for win first 
            if (activePlayer.getOpponentBoard().allSunk()) {
                triggerWin();
                return;
            }

            activePlayer = (activePlayer === players[0]) ? players[1] : players[0];

            // If the newly active player is an ai, play AI turn
            if (activePlayer.ai != undefined) { 
                playAITurn();
             };
        };

        function playAITurn() {
            // Generate random coords
            const move = activePlayer.ai.getRandomLegalMove();
            // Could add a timer here later. 

            // Handle the coords (normal turn playing.)
            handleCoordinates(move.x, move.y);

            aiTurnCount ++;
        }   
    
        function handleCoordinates(x, y) {
            if (activePlayer.playTurn(x, y)) {
                nextTurn();
            };
        }

        function triggerWin(winnerName) {
            currentState = POSTGAME(winnerName);
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
            handleCoordinates,
            nextTurn,
            playAITurn,
            triggerWin,
            roundsPlayed() { return aiTurnCount },
        }
    }

    function POSTGAME(winnerName) {
        function restartGame() {
            currentState = PREGAME();
        }
        return {
            winnerName,
            restartGame,
        }
    }

    // PUBLIC

    return {
        getCurrentState,
    };


};

export default GameManager;