import { placeShip, placeAllShipsRoutine, shipSetup } from "../src/shipsetup";
import { Gameboard } from '../src/gameboard';
import { jest } from "@jest/globals";

const mockOpponentAI = {
    getRandomShipPlacement: jest.fn(() => { return {x: 0, y: 0} }),
}

const mockBoard = () => {
    jest.fn(() => Gameboard());
}

function mockPlayer() {
    const playerBoard = mockBoard;
    const opponentBoard = mockBoard;

    return { name: 'Player',
    ai: undefined,
    getGameboard: () => { return playerBoard },
    getOpponentBoard: () => {return opponentBoard },
    }
};

function mockOpponent() {
    const playerBoard = mockBoard;
    const opponentBoard = mockBoard;

    return { name: 'Player',
    ai: mockOpponentAI,
    getGameboard: () => { return playerBoard },
    getOpponentBoard: () => {return opponentBoard },
    }
}

describe('Placing individual ships', () => {
    let mockShipData;
    let humanPlayer;
    let aiPlayer;
    
    beforeAll(() => {
        mockShipData = {
            name: 'test ship',
            size: '3',
        }
        humanPlayer = mockPlayer();
        aiPlayer = mockOpponent();
    });

    test('placeShip for AI calls the getRandomShipPlacement method', () => {
        placeShip(mockOpponent, mockShipData);
        console.log(aiPlayer.ai.getRandomShipPlacement.mock.calls);
    });
});