import { placeShip, placeAllShipsRoutine, shipSetup } from "../src/shipsetup";
import { Gameboard } from '../src/gameboard';

let mockPlayer;

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