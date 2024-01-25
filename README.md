# React Exercise: Tic-Tac-Toe

# Basics

## Initialize a new project
```bash
npm create vite@latest . -- --template react
```

## Components

### HTML Markup
```js
<div className="container">
    {squares.map((row, rowIndex) => 
    (
        <div className="row d-flex align-self-center" key={rowIndex}>
            {row.map((square, squareIndex) => (
                <div className="col square m-0 p-0 shadow-sm d-flex align-items-center justify-content-center" key={squareIndex}
                    onClick={() => handleClick(rowIndex, squareIndex)}
                    data-content={square}>

                    {square}

                </div>
            ))}
        </div>
    ))}
</div>
```
```js
{
    posts.filter((post) => post.likes > 80).map((post) => (

        <Posts
            key={post.id}
            avatar={post.author.image}
            author={post.author.name}
            // OTHER PROPS
        />

    ))
}
```

### Component *(Posts.jsx)*
```js
import './Posts.scss'

import { useState } from 'react'

function Posts({ prop1, prop2, ecc }) {

    // LOGIC

    return (
        <>

            /* MARRKUP */

        </>
    )
}

export default Posts
```

## useState Hook Basics

### Import the *useState* Hook
```js
import { useState } from 'react'
```

### Declare State values:
```js
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
```

### Manage the State values
```js
setPlayerTurn(playerTurn === "X" ? "O" : "X");
```
```js
updatedSquares[rowIndex][squareIndex] = playerTurn;
setSquares(updatedSquares)
```
```js
setWinner(playerTurn);
```
```js
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
```

### Recall a function to render the new values:
```js
<button onClick={handleReset}>RESET</button>
```

## Use of data attribute to dinamically manage style
```html
<div data-content={square}>
    {square}
</div>
```

```css
.square {

    &[data-content='O'] {
        background-color: #1a1a1a;
        color: #61dafbaa!important;
    }

    &[data-content='X'] {
        background-color: #1a1a1a;
        color: rgb(148, 60, 60)!important;
    }

}
```

## Check _App.jsx_ to see some matrix iteration functions
```js
const [squares, setSquares] = useState(
    [
        // SQUARES
        [null, null, null], // ROW
        [null, null, null],
        [null, null, null]
    ]
);
```

Example:
```js
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
```