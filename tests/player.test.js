import Player from "../src/player";
import Gameboard from '../src/gameboard';

let player;

    beforeEach(() => {
        player = Player();
    });

describe('Generic Player functions', () => {
    test('Player gets associated to their own game board', () => {
        expect(player.getGameBoard()).toBeTruthy();
    });

    test('Player gets a name property', () => {
        expect(player.hasOwn('name')).toBe(true);
    });

    test('Player has reference to opponent board', () => {
        expect(player.hasOwn('opponentBoard')).toBe(true);
    });

    test('Opponent board can be set after player init', () => {
        player.SetOpponentBoard(Gameboard());
        expect(player.opponentBoard).toBeTruthy();
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