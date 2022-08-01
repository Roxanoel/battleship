import Gameboard from "../src/gameboard";
import OpponentAI from "../src/opponent-ai";
import convertCoordinatesToIndex from "../src/utils";

let opponentAI;
const oppositeBoard = Gameboard();

beforeEach(() => {
    opponentAI = OpponentAI(oppositeBoard);
});

describe('Making a random legal move', () => {
    function mockRandom() {
        return 0;
    }
    
    test('legalMoves returns array of currently unattempted cells on opposite board', () => {
        expect(opponentAI.getLegalMoves()).toStrictEqual(opponentAI.oppositeBoard.getCells());
    });

    test('If a cell gets hit, it is not part of the legalMoves array: checking length', () => {
        oppositeBoard.receiveAttack(0); // Attacks 0,0 aka index 0
        expect(opponentAI.getLegalMoves().length).toBe(opponentAI.oppositeBoard.getCells().length - 1);
    });

    test('If a cell gets hit, it is not part of the legalMoves array: will not be hit twice', () => {
        oppositeBoard.receiveAttack(0); // Attacks 0,0 aka index 0
        const selectedCell = opponentAI.getLegalMoves[mockRandom()];
        expect(convertCoordinatesToIndex(selectedCell.x, selectedCell.y)).not.toBe(0);
    });
});
