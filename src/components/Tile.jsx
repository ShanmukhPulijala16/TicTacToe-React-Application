export default function Tile({ className, value, onClick, playerTurn }) {
    let hoverClass = null;
    if (value == null && playerTurn != null) {
        hoverClass = `${playerTurn.toLowerCase()}-hover`;
    }

    return (
        <>
            <h3 onClick={onClick} className={`tile ${className} ${hoverClass}`}>
                {value}
            </h3>
        </>
    );
}
