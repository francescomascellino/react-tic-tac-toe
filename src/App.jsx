import { useState } from 'react'
import './App.scss'

function App() {

    const [squares, setSquares] = useState(
        [
            // SQUARES
            [null, null, null], // ROW
            [null, null, null],
            [null, null, null]
        ]
    );

    // WINNER STATUS
    const [winner, setWinner] = useState(null); // THERE IS NO WINNER AT THE START OF THE GAME 🙃

    // PLAYER TURN
    const [playerTurn, setPlayerTurn] = useState('O'); // FIRST PLAYER IS O

    /* VICTORY CONDITIONS */

    // ROWS
    // row WILL BE THE rowIndex OF THE CLICKED SQUARE
    function checkRowWinner(row) {
        const firstSquare = row[0];

        // THIS WAY STARTING WITH THE FIRST ELEMENT OF THE ROW OF THE CLICKED SQUARE IT WILL CHECK IF THE OTHER ELEMENTS HAVE THE SAME VALUE
        // EXAMPLE IF row = 1:
        // [⬛ ⬛ ⬛]
        // [✔️ ✔️ ✔️] -> row[0] / row[1] / row[2]
        // [⬛ ⬛ ⬛]
        if (firstSquare === null) {
            return false;
        }

        return row.every(square => square === firstSquare); // RETURNS TRUE
    };

    // COLUMNS
    // squares WILL BE THE updateSquares MATRIX AFTER THE CLICK AND squareIndex THE "CLICKED INDEX" IN THE CURRENT ROW
    function checkColumnWinner(squares, squareIndex) {
        // THIS WAY IT WILL START CHECKING USING AS FIRST SQUARE THE ELEMENT AT THE SAME INDEX OF THE CLICKED SQUARE IN THE FIRST ROW
        const firstSquare = squares[0][squareIndex];

        // THEN IT WILL CHECK THE ELEMENTS AT THE SAME INDEX IN THER OTHER ROWS
        // EXAMPLE IF squareIndex = 0:
        // [✔️ ⬛ ⬛] -> squares[0][0]
        // [✔️ ⬛ ⬛] -> squares[1][0]
        // [✔️ ⬛ ⬛] -> squares[2][0]
        if (firstSquare === null) {
            return false;
        }

        return squares.every(row => row[squareIndex] === firstSquare); // RETURNS TRUE
    };

    // DIAGONALS
    // squares WILL BE THE updateSquares MATRIX AFTER THE CLICK
    function checkDiagonalWinner(squares) {

        // TAKES THE CENTER SQUARE
        const centerSquare = squares[1][1];
        if (centerSquare === null) {
            return false;
        }

        // MAIN
        // THIS WAY IT WILL CHECK square[row][squareIndex] (squares[0][0], squares[1][1], squares[2][2])
        // [✔️ ⬛ ⬛] -> squares[0][0]
        // [⬛ ✔️ ⬛] -> squares[1][1]
        // [⬛ ⬛ ✔️] -> squares[2][2]
        const mainDiagonal = squares.every((row, squareIndex) => row[squareIndex] === centerSquare);

        // INVERSE
        // THIS WAY IT WILL CHECK square[row][2 - squareIndex] (squares[0][2 - 0 = 2], squares[1][2 - 1 = 1], squares[2][2 - 2 = 0])
        // [⬛ ⬛ ✔️] -> squares[0][2 - 0 = 2]
        // [⬛ ✔️ ⬛] -> squares[1][2 - 1 = 1]
        // [✔️ ⬛ ⬛] -> squares[2][2 - 2 = 0]
        const inverseDiagonal = squares.every((row, squareIndex) => row[2 - squareIndex] === centerSquare);

        return mainDiagonal || inverseDiagonal;
    };

    function handleClick(rowIndex, squareIndex) {

        console.log("Player Turn:", playerTurn);

        let clickedSquareValue = squares[rowIndex][squareIndex];
        console.log("Clicked Square Value:", clickedSquareValue);

        if (clickedSquareValue === null && winner === null) {

            // setPlayerTurn((prevPlayerTurn) => (prevPlayerTurn === "X" ? "O" : "X"));
            setPlayerTurn(playerTurn === "X" ? "O" : "X");

            const updatedSquares = [...squares];
            console.log(updatedSquares);

            // GIVES THE CLICKED SQUARE THE SAME SYMBOL OF THE ACTUAL PLAYER
            updatedSquares[rowIndex][squareIndex] = playerTurn;
            setSquares(updatedSquares)

            console.log["test", playerTurn];

            if (
                checkRowWinner(updatedSquares[rowIndex]) ||
                checkColumnWinner(updatedSquares, squareIndex) ||
                checkDiagonalWinner(updatedSquares)
            ) {
                setWinner(playerTurn);
                console.log("Vincitore trovato!", playerTurn);
            }

            else if (updatedSquares.every((row) => row.every((square) => square !== null))) {
                setWinner('Draw');
                console.log("Partita finita in pareggio!");
            }

        }

    };

    function handleReset() {
        setSquares(
            [
                // SQUARES
                [null, null, null], // ROW
                [null, null, null],
                [null, null, null]
            ]
        );

        setPlayerTurn('O');
    }


    return (
        <>
            <div className='px-3'>
                <h1 className='text-center my-4'>
                    {
                        // NESTED TERNARY OPERATOR
                        winner !== null
                            ? (winner === 'Draw' ? 'La partita è finita in pareggio!' : `Il vincitore è ${winner}!`)
                            : `Turno del giocatore: ${playerTurn}`
                    }
                </h1>

                <div className="container">
                    {squares.map((row, rowIndex) => (
                        <div className="row d-flex align-self-center" key={rowIndex}>
                            {row.map((square, squareIndex) => (
                                <div className="col square m-0 p-0 shadow-sm d-flex align-items-center justify-content-center" key={squareIndex}
                                    onClick={() => handleClick(rowIndex, squareIndex)}
                                    data-content={square}
                                >
                                    {square}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className='text-center mt-3'>
                    <button onClick={handleReset}>RESET</button>
                </div>
            </div>

        </>
    )
}

export default App
