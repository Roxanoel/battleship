const GameManager = () => {
    const gameStates = ['PREGAME', 'GAME', 'POSTGAME'];

    let currentState = gameStates[0];

    function startGame(playerName, callbackFn) {
        // Do nothing (for now) if name is not provided.
        if (playerName === '') return;

        callbackFn();
    };

    return {
        currentState,
        startGame,
    }
};

export default GameManager;