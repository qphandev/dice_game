import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne, faDiceD6 } from '@fortawesome/free-solid-svg-icons';

library.add(faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne, faDiceD6);

// Make array of dice objects, with icon, value, and... whether it's locked?
// Where the heck are we going to keep 
// Toggle dieLock
    // true/false, style on or off.

class Die extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            dieFace: this.props.dieFace,
            dieValue: this.props.dieValue,
            dieLocked: this.props.dieLocked
        }
    }

    // Locked die should not be updated, no rerendered
    // shouldComponentUpdate(nextProps, nextState) {
    //     // component should update if dieLocked isn't locked
    //     const dieLocked = !this.state.dieLocked;
    //     return dieLocked;
    // };


    // https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change
    // this part literally killed me 
    // wtf even is happening here
    static getDerivedStateFromProps(props, state) {
        // console.log("getDerivedStateFromProps heree");
        // console.log(state);
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