function convertCoordinatesToIndex(x, y) {
    return +(x.toString() + y.toString());
}

function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
};

export default convertCoordinatesToIndex;

export {

}