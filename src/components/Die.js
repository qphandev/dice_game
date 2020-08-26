import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne, faDiceD6 } from '@fortawesome/free-solid-svg-icons';

library.add(faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne, faDiceD6);

function Die(props) {
    return (
        <FontAwesomeIcon onClick={props.onLockDie} className={`die ${props.dieLocked ? "red-border" : ""}`} icon={props.dieFace} size="4x" />
    )
}

export default Die;