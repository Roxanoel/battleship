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
        expect(testBoard.shipFits(testBoard.cells[6], 4, 'h')).toBe(true);
    });
    test('Ship will not fit horizontally if there is not enough space', () => {
        expect(testBoard.shipFits(testBoard.cells[9], 4,'h')).toBe(false);
    });

    test('attemptPlaceShip returns false if there is no room (horizontally)', () => {
        expect(testBoard.attemptPlaceShip(testBoard.cells[9], 4, 'h')).toBe(false);
    });

    test('Ship gets placed horizontally on coordinates if there is room: cells become occupied', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4, 'h');
        let testedCells = [];
        for(let i = 6; i < 10; i++) {
            testedCells.push(testBoard.cells[i]);
        }
        expect(testedCells.every(cell => cell.occupied === true)).toBe(true);
    });

    test('Horizontal ship gets placed correctly if on row other than 1', () => {
        testBoard.attemptPlaceShip(testBoard.cells[16], 4, 'h');
        let testedCells = [];
        for(let i = 16; i < 20; i++) {
            testedCells.push(testBoard.cells[i]);
        }
        expect(testedCells.every(cell => cell.occupied === true)).toBe(true);
    })

    test('Horizontal ship will not fit if an occupied cell is in the way', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4, 'h');
        testBoard.attemptPlaceShip(testBoard.cells[5], 4, 'h');

        expect(testBoard.ships.length).toBe(1);
    });

    test('Horizontal ship does not get placed when no room: no change', () => {
        testBoard.attemptPlaceShip(testBoard.cells[9], 4, 'h');
        expect(testBoard.ships.length).toBe(0);
    });

    // VERTICAL 
    test('Function tests whether a ship will fit vertically based on size', () => {
        expect(testBoard.shipFits(testBoard.cells[0], 4, 'v')).toBe(true);
    });
    test('Ship will not fit vertically if there is not enough space', () => {
        expect(testBoard.shipFits(testBoard.cells[90], 4, 'v')).toBe(false);
    });

    test('attemptPlaceShip returns false if there is no room (vertically)', () => {
        expect(testBoard.attemptPlaceShip(testBoard.cells[90], 4, 'v')).toBe(false);
    });

    test('Ship gets placed vertically on coordinates if there is room: cells become occupied', () => {
        testBoard.attemptPlaceShip(testBoard.cells[0], 4, 'v');
        let testedCells = [];
        for(let i = 0; i < 10*4; i+=10) {
            testedCells.push(testBoard.cells[i]);
        }
        expect(testedCells.every(cell => cell.occupied === true)).toBe(true);
    });

    test('Vertical ship will not fit if an occupied cell is in the way', () => {
        testBoard.attemptPlaceShip(testBoard.cells[0], 4, 'v');
        testBoard.attemptPlaceShip(testBoard.cells[10], 4, 'v');

        expect(testBoard.ships.length).toBe(1);
    });

    test('Vertical ship does not get placed when no room: no change', () => {
        testBoard.attemptPlaceShip(testBoard.cells[90], 4, 'v');
        expect(testBoard.ships.length).toBe(0);
    });

});

describe('Attacking cells', () => {

    test('Attempting an attack marks the targeted cell as attempted', () => {
        testBoard.receiveAttack(testBoard.cells[0]);
        expect(testBoard.cells[0].attempted).toBe(true);
    });

    test('receiveAttack returns "already attempted" if the targeted cell was already attempted', () => {
        testBoard.receiveAttack(testBoard.cells[0]);
        expect(testBoard.receiveAttack(testBoard.cells[0])).toBe('already attempted');
    });
    
    test('receiveAttack marks ship as hit when targeted position was a hit', () => {
        testBoard.attemptPlaceShip(testBoard.cells[0], 4, 'h');
        testBoard.receiveAttack(testBoard.cells[0]);
        expect(testBoard.ships[0].hits).toStrictEqual([0]);
    });

    test('checkForHit returns false when there was no hit', () => {
        testBoard.attemptPlaceShip(testBoard.cells[0], 4, 'h');
        expect(testBoard.checkForHit(testBoard.cells[10])).toBe(false);
    });
});

describe('Storing ship data', () => {

    test('Successfully placed vertical ship is stored in an array', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4, 'v');
        expect(testBoard.ships.length).toBe(1);
    });

    test('Successfully placed horizontal ship is stored in an array', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4, 'h');
        expect(testBoard.ships.length).toBe(1);
    });

    test('Horizontal ship coordinates are stored correctly', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4, 'h');
        expect(testBoard.ships[0].positions).toStrictEqual([6, 7, 8, 9]);
    });

    test('Vertical ship coordinates are stored correctly', () => {
        testBoard.attemptPlaceShip(testBoard.cells[6], 4, 'v');
        expect(testBoard.ships[0].positions).toStrictEqual([6, 16, 26, 36]);
    });
});
