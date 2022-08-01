import GameManager from "../src/game-manager";
import {jest} from "@jest/globals";

const mockStartGame = jest.fn(x => x);
let gameManager;
    
beforeEach(() => {
    gameManager = GameManager();
});

describe('Pre-game functions', () => {
    test('GameManager initialises at pre-game', () => {
        expect(gameManager.currentState).toBe('PREGAME');
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
        expect(gameManager.currentState).toBe('GAME');
    });

    test('Players get initialised', () => {
        // use mock to see if constructors are called 
        expect(gameManager.players.length).toBe(2)
    });

    test('Players get their own board + opponent board associated to them', () => {
        expect(gameManager.players[0].getGameBoard()).toStrictEqual(gameManager.boards[0]);
        expect(gameManager.players[0].getOpponentBoard()).toStrictEqual(gameManager.boards[1]);
        expect(gameManager.players[1].getGameBoard()).toStrictEqual(gameManager.boards[1]);
        expect(gameManager.players[1].getOpponentBoard()).toStrictEqual(gameManager.boards[0]);
    });

    test('Active player initialized as first player', () => {
        expect(gameManager.activePlayer).toBe(gameManager.players[0]);
    });
});

describe('Post-game functions', () => {

});