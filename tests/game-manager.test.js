import GameManager from "../src/game-manager";
import {jest} from "@jest/globals";

const mockStartGame = jest.fn(x => x);
let gameManager;
    
beforeEach(() => {
    gameManager = GameManager();
});

describe('Pre-game functions', () => {
    test('GameManager initialises at pre-game', () => {
        expect(gameManager.getCurrentState()).toBe('PREGAME');
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
        expect(gameManager.getCurrentState()).toBe('GAME');
    });

    test('Players get initialised', () => {
        // could use mock to see if constructors are called ?
        expect(gameManager.getPlayers().length).toBe(2)
    });

    test('Players get their own board + opponent board associated to them', () => {
        expect(gameManager.getPlayers()[0].getGameboard()).toStrictEqual(gameManager.getBoards()[0]);
        expect(gameManager.getPlayers()[0].getOpponentBoard()).toStrictEqual(gameManager.getBoards()[1]);
        expect(gameManager.getPlayers()[1].getGameboard()).toStrictEqual(gameManager.getBoards()[1]);
        expect(gameManager.getPlayers()[1].getOpponentBoard()).toStrictEqual(gameManager.getBoards()[0]);
    });

    test('Active player initialized as first player', () => {
        expect(gameManager.getActivePlayer()).toBe(gameManager.getPlayers()[0]);
    });

    // Changing turn
    test('nextTurn() changes the active player', () => {
        gameManager.nextTurn();
        expect(gameManager.getActivePlayer()).toBe(gameManager.getPlayers()[1]);
    });
});

describe('Game state: playing a turn', () => {
    beforeEach(() => {
        gameManager.startGame('Name');
    });

    test('to be implemented', () => {

    });
});

describe('Post-game functions', () => {

});