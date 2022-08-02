import GameManager from "../src/game-manager";
import {jest} from "@jest/globals";

const mockStartGame = jest.fn(x => x);
let gameManager;
    
beforeEach(() => {
    gameManager = GameManager();
});

describe('Pre-game functions', () => {
    test('GameManager initialises at pre-game', () => {
        expect(gameManager.getCurrentState().hasOwnProperty('canStartGame')).toBe(true);
    });

    test('Cannot advance to GAME state when no name is provided', () => {
        gameManager.startGame('', mockStartGame);
        expect(mockStartGame.mock.calls.length).toBe(0);
    });
    
    test('Game can start when name is provided', () => {
        gameManager.startGame('Name', mockStartGame);
        expect(mockStartGame.mock.calls.length).toBe(1);
    });
});

describe('Game functions', () => {
    // Triggers transition to GAME manually
    beforeEach(() => {
        gameManager.startGame('Name');
    });

    test('Game starts', () => {
        // Duck typing for GAME()
        expect(gameManager.getCurrentState().hasOwnProperty('nextTurn')).toBe(true);
    });

    test('Players get initialised', () => {
        // could use mock to see if constructors are called ?
        expect(gameManager.getCurrentState().getPlayers().length).toBe(2)
    });

    test('Players get their own board + opponent board associated to them', () => {
        expect(gameManager.getCurrentState().getPlayers()[0].getGameboard())
            .toStrictEqual(gameManager.getCurrentState().getBoards()[0]);
        expect(gameManager.getCurrentState().getPlayers()[0].getOpponentBoard())
            .toStrictEqual(gameManager.getCurrentState().getBoards()[1]);
        expect(gameManager.getCurrentState().getPlayers()[1].getGameboard())
            .toStrictEqual(gameManager.getCurrentState().getBoards()[1]);
        expect(gameManager.getCurrentState().getPlayers()[1].getOpponentBoard())
            .toStrictEqual(gameManager.getCurrentState().getBoards()[0]);
    });

    test('Active player initialized as first player', () => {
        expect(gameManager.getCurrentState().getActivePlayer()).toBe(gameManager.getCurrentState().getPlayers()[0]);
    });

    // Changing turn
    test('nextTurn() changes the active player', () => {
        gameManager.getCurrentState().nextTurn();
        expect(gameManager.getCurrentState().getActivePlayer()).toBe(gameManager.getCurrentState().getPlayers()[1]);
    });
});

describe('GAME state: playing a turn, no ai', () => {
    let _GAME;
    beforeEach(() => {
        gameManager.startGame('Name');
        _GAME = gameManager.getCurrentState();
    });

    test("handleCoordinates calls nextTurn if the move is valid", () => {
        const player1 = _GAME.getActivePlayer();
        _GAME.handleCoordinates(0,0);
        expect(_GAME.getActivePlayer()).not.toBe(player1);
    });

    test("handleCoordinates throws error if move is not valid", () => {
        expect(() => _GAME.handleCoordinates(34, 0)).toThrow();
    });
});

describe('GAME: transition to POSTGAME', () => {
    let _GAME;
    beforeEach(() => {
        gameManager.startGame('Name');
        _GAME = gameManager.getCurrentState();
    });

    test('triggerWin changes currentState to POSTGAME', () => {
        gameManager.triggerWin('Name');
        // Duck typing
        expect(gameManager.getCurrentState().hasOwnProperty('restartGame')).toBe(true);
    });

    test('If active player has not won yet, game continues as usual', () => {
        const player1 = _GAME.getActivePlayer();
        _GAME.handleCoordinates(0,0);
        expect(_GAME.getActivePlayer()).not.toBe(player1);
        // Duck typing for GAME state
        expect(gameManager.getCurrentState().hasOwnProperty('nextTurn')).toBe(true);
    });

    test('If active player has won, current state of game becomes postgame', () => {
        const player1 = _GAME.getActivePlayer();
        // Simulate placing opponent ship
        player1.getOpponentBoard().attemptPlaceShip({x:0, y:0}, 1, 'h');
        // Play turn which should sink this ship
        _GAME.handleCoordinates(0, 0);
        // Duck typing to check state
        expect(gameManager.getCurrentState().hasOwnProperty('restartGame')).toBe(true);
    });
});

describe('Post-game functions', () => {
    let _POSTGAME;
    beforeEach(() => {
        gameManager.triggerWin('Winner name');
        _POSTGAME = gameManager.getCurrentState()
    });

    test ('Postgame contains name of the winner as property', () => {
        expect(_POSTGAME.hasOwnProperty('winnerName')).toBe(true);
    });

    test('The correct winner name is stored', () => {
        expect(_POSTGAME.winnerName).toBe('Winner name');
    });

    test('restartGame restores currentState back to pregame', () => {
        _POSTGAME.restartGame();
        // Duck typing
        expect(gameManager.getCurrentState().hasOwnProperty('startGame')).toBe(true);
    });

    test('Restarting a game after a win reinitialises players', () => {
        _POSTGAME.restartGame();
        gameManager.getCurrentState().startGame('New player');
        const _GAME = gameManager.getCurrentState();
        expect(_GAME.getPlayers()[0].name).toBe('New player');
    });
});
