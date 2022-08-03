import { placeShip, placeAllShipsRoutine, shipSetup } from "../src/shipsetup";
import { Gameboard } from '../src/gameboard';
import { jest } from "@jest/globals";

let mockPlayer;
let mockOpponent;

const mockOpponentAI = {
    getRandomShipPlacement: jest.fn(() => { return {x: 0, y: 0} }),
}

const mockBoard = () => {
    jest.fn(() => Gameboard());
}

const mockPlayerPlacement = 

beforeAll(() => {

    mockPlayer = () => {
        const playerBoard = mockBoard;
        const opponentBoard = mockBoard;

        return { name: 'Player',
        ai: undefined,
        getGameboard: () => { return playerBoard },
        getOpponentBoard: () => {return opponentBoard },
        }
    };

    mockOpponent = () => {
        const playerBoard = mockBoard;
        const opponentBoard = mockBoard;

        return { name: 'Player',
        ai: mockOpponentAI,
        getGameboard: () => { return playerBoard },
        getOpponentBoard: () => {return opponentBoard },
        }
    }
});

describe('Placing individual ships', () => {
    let mockShipData;
    
    beforeAll(() => {
        mockShipData = {
            name: 'test ship',
            size: '3',
        }
    });

    test('placeShip for AI calls the getRandomShipPlacement method', () => {

    });
});