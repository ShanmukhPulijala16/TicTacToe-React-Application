import GameState from "./GameState";

function Reset({ gameState, handleReset }) {
    if (gameState !== GameState.isInProgress) {
        return (
            <button className="reset" onClick={handleReset}>Play Again</button>
        )
    } else {
        return <></>
    }
}

export default Reset;