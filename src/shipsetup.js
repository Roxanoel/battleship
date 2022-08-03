async function placeShip(player, shipInfo) {
    // read whether the player is ai, if the player is ai use the ai to place the ship
    //await info for placement, would come from form in final app v1, no drag and drop yet
    //then place ship at the right spot using ref to player
}

async function placeAllShipsRoutine(player) {
    // for loop for placing each ship based on length of shipspecs

        // inside loop: call placeShip and once it resolves, loop can continue... do while?

    // once loop is done the promise is resolved
}

async function shipSetup(players) {
    // for loop for each player 

    // return all ship placements in an array/object
}

export {
    placeShip,
    placeAllShipsRoutine,
    shipSetup,
}