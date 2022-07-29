import Gameboard from '../src/gameboard';

let testBoard;

    beforeEach(() => {
        testBoard = Gameboard();
    });

describe('Gameboard generation', () => {

    test('A 100-cell board is created', () => {
        expect(testBoard.cells.length).toBe(100);
    });

    test('Cells have x and y coordinates', () => {
        expect(testBoard.cells.every(cell => cell.hasOwnProperty('x') && cell.hasOwnProperty('y')))
        .toBe(true);
    });

    test('Each cell is an object with an initially "false" occupied condition', () => {
        expect(testBoard.cells[0].occupied).toBe(false);
    });
    
    test('Each cell has an "attempted" property which is initialized as false', () => {
        expect(testBoard.cells.every(cell => cell.attempted === false))
        .toBe(true);
    });

});

describe('Ship placement', () => {

    test('Function tests whether a ship will fit horizontally based on size', () => {
        expect(testBoard.boatFits(testBoard.cells[6], 4)).toBe(true);
    });
    test('Ship will not fit horizontally if there is not enough space', () => {
        expect(testBoard.boatFits(testBoard.cells[9], 4)).toBe(false);
    });

    test('attemptPlaceShip returns false if there is no room', () => {
        expect(testBoard.attemptPlaceShip(testBoard.cells[9], 4)).toBe(false);
    });

    test('Ship gets placed horizontally on coordinates if there is room: cells become occupied', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4);
        let testedCells = [];
        for(let i = 6; i < 10; i++) {
            testedCells.push(testBoard.cells[i]);
        }
        expect(testedCells.every(cell => cell.occupied === true)).toBe(true);
    });

    test('Successfully placed ship is stored in an array', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4);
        expect(testBoard.ships.length).toBe(1);
    });

    test('Ship will not fit if an occupied cell is in the way', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4);
        testBoard.attemptPlaceShip(testBoard.cells[5], 4);

        expect(testBoard.ships.length).toBe(1);
    });

    test('Ship does not get placed when no room: no change', () => {
        testBoard.attemptPlaceShip(testBoard.cells[9], 4);
        expect(testBoard.ships.length).toBe(0);
    });

});

describe('Attacking cells', () => {

    test('Attempting an attack marks the targeted cell as attempted', () => {
        testBoard.receiveAttack(testBoard.cells[0]);
        expect(testBoard.cells[0].attempted).toBe(true);
    });

    test('receiveAttack returns false if the targeted cell was already attempted', () => {
        testBoard.receiveAttack(testBoard.cells[0]);
        expect(testBoard.receiveAttack(testBoard.cells[0])).toBe(false);
    })
});