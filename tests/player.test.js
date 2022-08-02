import Player from "../src/player";
import Gameboard from '../src/gameboard';

let player;

    beforeEach(() => {
        player = Player('Name', Gameboard(), Gameboard() );
    });

describe('Generic Player functions', () => {
    test('Player gets associated to their own game board', () => {
        expect(player.getGameboard()).toBeTruthy();
    });

    test('Player gets a name property', () => {
        expect(player.hasOwnProperty('name')).toBe(true);
    });

    test('Player has reference to opponent board', () => {
        expect(player.getOpponentBoard()).toBeTruthy();
    });
});

describe('Playing a turn', () => {
    test('playTurn throws error if no coords are passed in', () => {
        expect(() => { player.playTurn() }).toThrow();
    });
    test('playTurn throws error if x coord is out of bounds', () => {
        expect(() => { player.playTurn(11, 0) }).toThrow();
    });
    test('playTurn throws error if y coord is out of bounds', () => {
        expect(() => { player.playTurn(0, 11) }).toThrow();
    });
    test('playTurn throws error if both coords are out of bounds', () => {
        expect(() => { player.playTurn(11, 11) }).toThrow();
    });
    test('playTurn returns false for already attempted cells', () => {
        player.getOpponentBoard().attemptPlaceShip({x:0, y:0}, 4, 'h');
        player.playTurn(0,0).toBe(false);
    });
});