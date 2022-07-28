import Ship from '../src/ship';

describe('ship properties and functions', () => {
    // Setup
    let testShip;

    beforeEach(() => {
        testShip = Ship(4);
    })

    // Tests
    
    test('Ship has correct length', () => {
        expect(testShip.length).toBe(4);
    });

    test('Hits array initializes correctly', () => {
        expect(testShip.hits).toStrictEqual([false, false, false, false]);
    });
    
    test('Ship correctly registers hit', () => {
        testShip.hit(2);
        expect(testShip.hits[2]).toBe(true);
    });

    test('Ship is not sunk when it has un-hit positions', () => {
        testShip.hit(2);
        expect(testShip.isSunk()).toBe(false);
    }); 

    test('Ship counts as sunk when all positions are hit', () => {
        for (let i = 0; i < testShip.hits.length; i++) {
            testShip.hit(i);
        }
        expect(testShip.isSunk()).toBe(true);
    });
});
