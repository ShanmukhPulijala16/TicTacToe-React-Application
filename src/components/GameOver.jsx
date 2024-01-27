import GameState from "./GameState";

function GameOver({ gameState }) {
    switch (gameState) {
        case GameState.playerOWins:
            return <div className="game-over">Player O Wins</div>
        case GameState.playerXWins:
            return <div className="game-over">Player X Wins</div>
        case GameState.isInProgress:
            return <div></div>
        case GameState.draw:
            return <div className="game-over">Draw</div>
        default:
            return <div></div>
    }
}

export default GameOver;