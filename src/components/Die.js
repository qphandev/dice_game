import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne, faDiceD6 } from '@fortawesome/free-solid-svg-icons';

library.add(faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne, faDiceD6);

class Die extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            dieFace: this.props.dieFace,
            dieValue: this.props.dieValue,
            dieLocked: this.props.dieLocked
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { dieFace: props.dieFace, dieValue: props.dieValue, dieLocked: props.dieLocked };
    };

    render () {
        console.log('DIE.js in render BOOLEAN');
        console.log(this.state.dieLocked);

        return (
            <FontAwesomeIcon onClick={this.props.onLockDie} className={`die ${this.state.dieLocked ? "red-border" : ""}`} icon={this.state.dieFace} size="4x" />
        );
    }
}

export default Die;