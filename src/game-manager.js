const GameManager = () => {
    const gameStates = ['PREGAME', 'GAME', 'POSTGAME'];

    let currentState = gameStates[0];

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
    };

    return {
        currentState,
        startGame,
    }
};

export default GameManager;