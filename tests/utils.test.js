import convertCoordinatesToIndex from "../src/utils";

test('Correctly converts 3, 2 to 32', () => {
    expect(convertCoordinatesToIndex(3, 2)).toBe(32);
});
test('Correctly converts 00 to 0', () => {
    expect(convertCoordinatesToIndex(0, 0)).toBe(0);
});
test('Correctly convers 01 to 1', () => {
    expect(convertCoordinatesToIndex(0, 1)).toBe(1);
})