import { placeShip, placeAllShipsRoutine, shipSetup } from "../src/shipsetup";
import { Gameboard } from '../src/gameboard';

let mockPlayer;
let mockOpponent;

const mockOpponentAI = {
    getRandomShipPlacement: jest.fn(() => { return {x: 0, y: 0} }),
}

beforeAll(() => {

    mockPlayer = () => {
        const playerBoard = Gameboard();
        const opponentBoard = Gameboard();

        return { name: 'Player',
        ai: undefined,
        getGameboard: () => { return playerBoard },
        getOpponentBoard: () => {return opponentBoard },
        }
    };

    mockOpponent = () => {
        const playerBoard = Gameboard();
        const opponentBoard = Gameboard();

        return { name: 'Player',
        ai: mockOpponentAI(),
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

    test('')
});