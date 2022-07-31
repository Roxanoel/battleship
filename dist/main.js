/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\n/* eslint-disable no-use-before-define */\nfunction Gameboard() {\n    const cells = generateCells(); \n    const ships = [];\n    const misses = [];\n\n    function generateCells() {\n        const cells = [];\n    \n        // Creating each row\n        for(let i = 0; i < 10; i+=1) {\n            // Creating each col    \n            for(let j = 0; j< 10; j+=1) {\n                // create the cell with the right dataset elements. \n                const cell = {\n                    x: i,\n                    y: j,\n                    occupied: false,\n                    attempted: false,\n                    occupyCell() {\n                        this.occupied = true;\n                    },\n                    markAsAttempted() {\n                        this.attempted = true;\n                    },\n                }\n                cells.push(cell);\n            }\n        }\n    \n        return cells;\n    }\n\n    function getCells() {\n        return cells;\n    }\n\n    function getShips() {\n        return ships;\n    }\n\n    function getMisses() {\n        return misses;\n    }\n\n    function shipFits(position, size, orientation) {\n        if (orientation === 'h') {\n            // Horizontal fit: col index at start + size should be less than final col index\n            if (!(position.y + (size -1) <= 9)) return false;\n\n            // Check if any cell in the way is occupied\n            for(let i = position.y; i < position.y + size; i+=1) {\n                const index = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(position.x, i);\n                if (cells[index].occupied === true) return false;\n            }\n            // Otherwise: \n            return true;\n        }\n        else if (orientation === 'v') {\n            // Check for board overflow at the bottom.\n            if((position.x + (size -1) > 9)) return false;\n\n            // Check if any cell in the way is occupied\n            for(let i = position.x; i < position.x + size; i+=1) {\n                const index = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(i, position.y);\n                if (cells[index].occupied === true) return false;\n            }\n\n            // Otherwise: \n            return true;\n        }\n        // Error is only thrown if orientation is neither h nor v\n        throw new Error('Orientation value invalid. Format = \"h\" or \"v\"');\n        \n    };\n    function attemptPlaceShip(position, size, orientation) {\n        // Checks if ship fits; if not, early return.\n        if (shipFits(position, size, orientation) === false) \n        return false;\n\n        // For ship constructor\n        let cellIndices = [];\n        \n        if (orientation === 'h') {\n            // Occupy the right cells\n            for(let i = position.y; i < position.y + size; i+=1) {\n                // Reconstitutes index from position\n                const index = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(position.x, i);\n                cells[index].occupyCell(); \n                cellIndices.push(index);\n            }\n            // Store ship in array\n            ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(cellIndices));\n\n            // Indicates success\n            return true;\n        } else if (orientation === 'v') {\n            // Occupy the right cells\n            for(let i = position.x; i < position.x + size; i+=1) {\n                // Reconstitutes index from position\n                const index = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(i, position.y);\n                cells[index].occupyCell(); \n                cellIndices.push(index);\n            }\n            // Store ship in array\n            ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(cellIndices));\n\n            // Indicates success\n            return true;\n        }\n        // Error is only thrown if orientation is neither h nor v\n        throw new Error('Orientation value invalid. Format = \"h\" or \"v\"');\n    };\n\n    function receiveAttack(position) {\n        // Early returns if this position has already been targeted.\n        if (position.attempted === true) return 'already attempted';\n        position.markAsAttempted();\n        checkForHit(cells.indexOf(position));\n    };\n    function checkForHit(positionIndex) {\n        // Checks if there is a ship at that position\n        for (let i = 0; i < ships.length; i+=1) {\n            // Tries to find a match among each ship's positions\n            for(let j = 0; j < ships[i].positions.length; j+=1) {\n                if (ships[i].positions[j] === positionIndex) {\n                    // Make ship take the hit\n                    ships[i].hit(positionIndex);\n                    // Return true\n                    return true;\n                }\n            }\n        }\n        // If no hit was registered\n        misses.push(positionIndex);\n        return false;\n    };\n    function gameLost() {\n        return ships.every(ship => ship.isSunk());\n    }\n\n    // PUBLIC\n    return {\n        getCells,\n        getShips,\n        getMisses,\n        attemptPlaceShip,\n        receiveAttack,\n        gameLost,\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZWJvYXJkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanM/ZmU4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgY29udmVydENvb3JkaW5hdGVzVG9JbmRleCBmcm9tIFwiLi91dGlscy5qc1wiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZ2VuZXJhdGVDZWxscygpOyBcbiAgICBjb25zdCBzaGlwcyA9IFtdO1xuICAgIGNvbnN0IG1pc3NlcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDZWxscygpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRpbmcgZWFjaCByb3dcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKz0xKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGluZyBlYWNoIGNvbCAgICBcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGo8IDEwOyBqKz0xKSB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBjZWxsIHdpdGggdGhlIHJpZ2h0IGRhdGFzZXQgZWxlbWVudHMuIFxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGksXG4gICAgICAgICAgICAgICAgICAgIHk6IGosXG4gICAgICAgICAgICAgICAgICAgIG9jY3VwaWVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb2NjdXB5Q2VsbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYXJrQXNBdHRlbXB0ZWQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVtcHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENlbGxzKCkge1xuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2hpcHMoKSB7XG4gICAgICAgIHJldHVybiBzaGlwcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNaXNzZXMoKSB7XG4gICAgICAgIHJldHVybiBtaXNzZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hpcEZpdHMocG9zaXRpb24sIHNpemUsIG9yaWVudGF0aW9uKSB7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAvLyBIb3Jpem9udGFsIGZpdDogY29sIGluZGV4IGF0IHN0YXJ0ICsgc2l6ZSBzaG91bGQgYmUgbGVzcyB0aGFuIGZpbmFsIGNvbCBpbmRleFxuICAgICAgICAgICAgaWYgKCEocG9zaXRpb24ueSArIChzaXplIC0xKSA8PSA5KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhbnkgY2VsbCBpbiB0aGUgd2F5IGlzIG9jY3VwaWVkXG4gICAgICAgICAgICBmb3IobGV0IGkgPSBwb3NpdGlvbi55OyBpIDwgcG9zaXRpb24ueSArIHNpemU7IGkrPTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNvbnZlcnRDb29yZGluYXRlc1RvSW5kZXgocG9zaXRpb24ueCwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxzW2luZGV4XS5vY2N1cGllZCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlOiBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndicpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBib2FyZCBvdmVyZmxvdyBhdCB0aGUgYm90dG9tLlxuICAgICAgICAgICAgaWYoKHBvc2l0aW9uLnggKyAoc2l6ZSAtMSkgPiA5KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhbnkgY2VsbCBpbiB0aGUgd2F5IGlzIG9jY3VwaWVkXG4gICAgICAgICAgICBmb3IobGV0IGkgPSBwb3NpdGlvbi54OyBpIDwgcG9zaXRpb24ueCArIHNpemU7IGkrPTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNvbnZlcnRDb29yZGluYXRlc1RvSW5kZXgoaSwgcG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxzW2luZGV4XS5vY2N1cGllZCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2U6IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXJyb3IgaXMgb25seSB0aHJvd24gaWYgb3JpZW50YXRpb24gaXMgbmVpdGhlciBoIG5vciB2XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignT3JpZW50YXRpb24gdmFsdWUgaW52YWxpZC4gRm9ybWF0ID0gXCJoXCIgb3IgXCJ2XCInKTtcbiAgICAgICAgXG4gICAgfTtcbiAgICBmdW5jdGlvbiBhdHRlbXB0UGxhY2VTaGlwKHBvc2l0aW9uLCBzaXplLCBvcmllbnRhdGlvbikge1xuICAgICAgICAvLyBDaGVja3MgaWYgc2hpcCBmaXRzOyBpZiBub3QsIGVhcmx5IHJldHVybi5cbiAgICAgICAgaWYgKHNoaXBGaXRzKHBvc2l0aW9uLCBzaXplLCBvcmllbnRhdGlvbikgPT09IGZhbHNlKSBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIEZvciBzaGlwIGNvbnN0cnVjdG9yXG4gICAgICAgIGxldCBjZWxsSW5kaWNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgICAgIC8vIE9jY3VweSB0aGUgcmlnaHQgY2VsbHNcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHBvc2l0aW9uLnk7IGkgPCBwb3NpdGlvbi55ICsgc2l6ZTsgaSs9MSkge1xuICAgICAgICAgICAgICAgIC8vIFJlY29uc3RpdHV0ZXMgaW5kZXggZnJvbSBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY29udmVydENvb3JkaW5hdGVzVG9JbmRleChwb3NpdGlvbi54LCBpKTtcbiAgICAgICAgICAgICAgICBjZWxsc1tpbmRleF0ub2NjdXB5Q2VsbCgpOyBcbiAgICAgICAgICAgICAgICBjZWxsSW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFN0b3JlIHNoaXAgaW4gYXJyYXlcbiAgICAgICAgICAgIHNoaXBzLnB1c2goU2hpcChjZWxsSW5kaWNlcykpO1xuXG4gICAgICAgICAgICAvLyBJbmRpY2F0ZXMgc3VjY2Vzc1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2Jykge1xuICAgICAgICAgICAgLy8gT2NjdXB5IHRoZSByaWdodCBjZWxsc1xuICAgICAgICAgICAgZm9yKGxldCBpID0gcG9zaXRpb24ueDsgaSA8IHBvc2l0aW9uLnggKyBzaXplOyBpKz0xKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVjb25zdGl0dXRlcyBpbmRleCBmcm9tIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjb252ZXJ0Q29vcmRpbmF0ZXNUb0luZGV4KGksIHBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgIGNlbGxzW2luZGV4XS5vY2N1cHlDZWxsKCk7IFxuICAgICAgICAgICAgICAgIGNlbGxJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RvcmUgc2hpcCBpbiBhcnJheVxuICAgICAgICAgICAgc2hpcHMucHVzaChTaGlwKGNlbGxJbmRpY2VzKSk7XG5cbiAgICAgICAgICAgIC8vIEluZGljYXRlcyBzdWNjZXNzXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFcnJvciBpcyBvbmx5IHRocm93biBpZiBvcmllbnRhdGlvbiBpcyBuZWl0aGVyIGggbm9yIHZcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPcmllbnRhdGlvbiB2YWx1ZSBpbnZhbGlkLiBGb3JtYXQgPSBcImhcIiBvciBcInZcIicpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHBvc2l0aW9uKSB7XG4gICAgICAgIC8vIEVhcmx5IHJldHVybnMgaWYgdGhpcyBwb3NpdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHRhcmdldGVkLlxuICAgICAgICBpZiAocG9zaXRpb24uYXR0ZW1wdGVkID09PSB0cnVlKSByZXR1cm4gJ2FscmVhZHkgYXR0ZW1wdGVkJztcbiAgICAgICAgcG9zaXRpb24ubWFya0FzQXR0ZW1wdGVkKCk7XG4gICAgICAgIGNoZWNrRm9ySGl0KGNlbGxzLmluZGV4T2YocG9zaXRpb24pKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGNoZWNrRm9ySGl0KHBvc2l0aW9uSW5kZXgpIHtcbiAgICAgICAgLy8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCBhdCB0aGF0IHBvc2l0aW9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgICAgICAvLyBUcmllcyB0byBmaW5kIGEgbWF0Y2ggYW1vbmcgZWFjaCBzaGlwJ3MgcG9zaXRpb25zXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgc2hpcHNbaV0ucG9zaXRpb25zLmxlbmd0aDsgais9MSkge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5wb3NpdGlvbnNbal0gPT09IHBvc2l0aW9uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzaGlwIHRha2UgdGhlIGhpdFxuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQocG9zaXRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBubyBoaXQgd2FzIHJlZ2lzdGVyZWRcbiAgICAgICAgbWlzc2VzLnB1c2gocG9zaXRpb25JbmRleCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGdhbWVMb3N0KCkge1xuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcbiAgICB9XG5cbiAgICAvLyBQVUJMSUNcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRDZWxscyxcbiAgICAgICAgZ2V0U2hpcHMsXG4gICAgICAgIGdldE1pc3NlcyxcbiAgICAgICAgYXR0ZW1wdFBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2FtZUxvc3QsXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/gameboard.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable no-use-before-define */\nfunction Ship(positions) {\n    return {\n        positions,\n        length: positions.length,\n        hits: [],\n        hit(position) {\n            // Only adds hit to the array if it is not already present.\n            if (!(this.hits.includes(position)))\n            this.hits.push(position);\n        },\n        isSunk() {\n            return(this.hits.length === this.length);\n        },\n    }\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hpcC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanM/MzVkYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuZnVuY3Rpb24gU2hpcChwb3NpdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwb3NpdGlvbnMsXG4gICAgICAgIGxlbmd0aDogcG9zaXRpb25zLmxlbmd0aCxcbiAgICAgICAgaGl0czogW10sXG4gICAgICAgIGhpdChwb3NpdGlvbikge1xuICAgICAgICAgICAgLy8gT25seSBhZGRzIGhpdCB0byB0aGUgYXJyYXkgaWYgaXQgaXMgbm90IGFscmVhZHkgcHJlc2VudC5cbiAgICAgICAgICAgIGlmICghKHRoaXMuaGl0cy5pbmNsdWRlcyhwb3NpdGlvbikpKVxuICAgICAgICAgICAgdGhpcy5oaXRzLnB1c2gocG9zaXRpb24pO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKSB7XG4gICAgICAgICAgICByZXR1cm4odGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpO1xuICAgICAgICB9LFxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/ship.js\n");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction convertCoordinatesToIndex(x, y) {\n    return +(x.toString() + y.toString());\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convertCoordinatesToIndex);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3V0aWxzLmpzP2I1NTMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY29udmVydENvb3JkaW5hdGVzVG9JbmRleCh4LCB5KSB7XG4gICAgcmV0dXJuICsoeC50b1N0cmluZygpICsgeS50b1N0cmluZygpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udmVydENvb3JkaW5hdGVzVG9JbmRleDsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utils.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;