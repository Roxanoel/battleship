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

export {
    PREGAME,
}