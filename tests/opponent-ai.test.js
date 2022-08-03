import { Gameboard } from "../src/gameboard";
import OpponentAI from "../src/opponent-ai";
import convertCoordinatesToIndex from "../src/utils";

let opponentAI;
let ownBoard;
let oppositeBoard;

const mockRandom = () => {
    return 0;
}

beforeEach(() => {
    ownBoard = Gameboard();
    oppositeBoard = Gameboard();
    opponentAI = OpponentAI(ownBoard, oppositeBoard);
});

describe('Making a random legal move', () => {

    // FUNCTIONS HIDDEN AFTER SUCCESFUL TESTING
    /* test('legalMoves returns array of currently unattempted cells on opposite board', () => {
        expect(opponentAI.getLegalMoves()).toStrictEqual(opponentAI.oppositeBoard.getCells());
    });

    test('If a cell gets hit, it is not part of the legalMoves array: checking length', () => {
        oppositeBoard.receiveAttack(oppositeBoard.getCells()[0]); // Attacks 0,0 aka index 0
        expect(opponentAI.getLegalMoves().length).toBe(opponentAI.oppositeBoard.getCells().length - 1);
    });

    test('If a cell gets hit, it is not part of the legalMoves array: will not be hit twice', () => {
        oppositeBoard.receiveAttack(oppositeBoard.getCells()[0]); // Attacks 0,0 aka index 0
        const selectedCell = opponentAI.getLegalMoves()[mockRandom()];
        expect(convertCoordinatesToIndex(selectedCell.x, selectedCell.y)).not.toBe(0);
    }); */

    test('returnLegalMove returns coordinates of a random legal move', () => {
        expect(opponentAI.getRandomLegalMove(mockRandom())).toStrictEqual({ x:0, y:0 });
    });
});

describe('Placing ships', () => {
    const mockShipLength = 3;

    test('returnRandomShipPlacement returns a random legal placement', () => {
        expect(opponentAI.getRandomShipPlacement(3, 'h', mockRandom())).toStrictEqual({ x:0, y:0 });
    });
});

// NOW HIDDEN