import Player from "../src/player";
import Gameboard from '../src/gameboard';

describe('Generic Player functions', () => {
    let player;

    beforeEach(() => {
        player = Player();
    });

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