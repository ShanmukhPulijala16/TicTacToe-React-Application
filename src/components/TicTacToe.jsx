import { useState, useEffect } from "react";
import Board from "./Board";
import "../App.css";
import GameState from "./GameState";
import GameOver from "./GameOver";
import Reset from "./Reset";

import clickSoundAsset from "../sounds/click.wav";
import gameOverSoundAsset from "../sounds/game_over.wav";

const PLAYER_X = "X";
const PLAYER_O = "O";

const clickSound = new Audio(clickSoundAsset);
const gameOverSound = new Audio(gameOverSoundAsset);

clickSound.volume = 0.5;
gameOverSound.volume = 0.7;

// Writing down all possible winning combinations
const winningCombos = [
    // rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    // columns
    { combo: [0, 3, 6], strikeClass: "strike-col-1" },
    { combo: [1, 4, 7], strikeClass: "strike-col-2" },
    { combo: [2, 5, 8], strikeClass: "strike-col-3" },
    // diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diag-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diag-2" }
];

const checkWinner = (tiles, setStrikeClass, setGameState) => {
    for (const combination of winningCombos) {
        const { combo, strikeClass } = combination;
        if (tiles[combo[0]] != null && tiles[combo[0]] == tiles[combo[1]] && tiles[combo[0]] == tiles[combo[2]]) {
            setStrikeClass(strikeClass);
            if (tiles[combo[0]] == PLAYER_O) {
                setGameState(GameState.playerOWins);
            } else {
                setGameState(GameState.playerXWins);
            }
            return;
        }
        const areAllTilesFilled = tiles.every((element) => element != null && element != undefined);
        if (areAllTilesFilled) {
            setGameState(GameState.draw);
        }
    }
}

const TicTacToe = () => {

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.isInProgress);

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState, playerTurn);
    }, [tiles]);

    useEffect(() => {
        if (gameState != GameState.isInProgress) {
            gameOverSound.play();
            console.log("gameOverSound");
        } else {
            const evenOneElementTrue = tiles.some(element => element !== null);
            if (evenOneElementTrue) {
                clickSound.play();
                console.log("clickSound");
            }
        }
    }, [gameState, tiles]);

    const handleReset = () => {
        setTiles(new Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
        setGameState(GameState.isInProgress);
    }

    const handleTileClick = (index) => {

        if (gameState !== GameState.isInProgress) {
            return;
        }
        if (tiles[index] != null) {
            return;
        }
        clickSound.play();
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;

        setTiles(newTiles);
        if (playerTurn == PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    }

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board strikeClass={strikeClass} playerTurn={playerTurn} handleTileClick={handleTileClick} tiles={tiles} />
            <GameOver gameState={gameState} />
            <Reset gameState={gameState} handleReset={handleReset} />
        </div>
    )
}

export default TicTacToe;