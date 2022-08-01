const GameManager = () => {
    const gameStates = ['PREGAME', 'GAME', 'POSTGAME'];

    let currentState = gameStates[0];

    return {
        currentState,
    }
};

export default GameManager;