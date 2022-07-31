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
    beforeEach(() => {
        player.SetOpponentBoard();
    });
    test('playTurn throws error if no coords are passed in', () => {
        expect(player.playTurn()).toThrow();
    });
    test('playTurn throws error if coords are out of bounds', () => {
        expect(player.playTurn(11, 11)).toThrow();
    });
});