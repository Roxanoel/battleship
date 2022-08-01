import GameManager from "../src/game-manager";
import {jest} from "@jest/globals";

const mockStartGame = jest.fn(x => x);

describe('Pre-game functions', () => {
    let gameManager;
    
    beforeEach(() => {
        gameManager = GameManager();
    });

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

});

describe('Post-game functions', () => {

});