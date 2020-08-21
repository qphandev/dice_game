import React from 'react';

function GameButton (props) {
    return (
        <div className="button-container">
            <button onClick={ props.onDiceRoll } className="deep-orange darken-1 btn-large">{props.buttonText}</button>
        </div>
    )
}

export default GameButton;