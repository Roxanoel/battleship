const Gameboard = require('../src/gameboard');
const Ship = require('../src/ship');

describe('Gameboard functions', () => {
    let testBoard;

    beforeEach(() => {
        testBoard = Gameboard();
    })

    test('A 100-cell board is created', () => {
        expect(testBoard.cells.length).toBe(100);
    });

    test('Each cell is an object with an initially "false" occupied condition', () => {
        expect(testBoard.cells[0].occupied).toBe(false);
    });

    test('Function tests whether a boat will fit horizontally based on size', () => {
        expect(testBoard.boatFits(cells[0], 4)).toBe(true);
    });
    test('Boat will not fit horizontally if there is not enough space', () => {
        expect(testBoard).boatFits(cells[9], 4).toBe(false);
    })
});