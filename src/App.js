import React, { Component } from 'react';
import './App.css';

import Die from './components/Die';
import GameButton from './components/GameButton';

// https://www.robinwieruch.de/react-state-array-add-update-remove
// https://stackoverflow.com/questions/24718709/reactjs-does-render-get-called-any-time-setstate-is-called

// Weird error where I hit GameButton, it update state but doesn't render component. But then I hit the Die component and it rerenders.
// how the heck do I make it so that people can't lock the beginning dice?
  // don't render shit
  // lock the lock on componentMount
const INITIAL_DICE = [
  {dieFace: "dice-d6", dieValue: 0, dieLocked: false},
  {dieFace: "dice-d6", dieValue: 0, dieLocked: false},
  {dieFace: "dice-d6", dieValue: 0, dieLocked: false},
  {dieFace: "dice-d6", dieValue: 0, dieLocked: false},
  {dieFace: "dice-d6", dieValue: 0, dieLocked: false}
];

const DICE_DATA_ARRAY = [
  {dieFace: "dice-one", dieValue: 1},
  {dieFace: "dice-two", dieValue: 2},
  {dieFace: "dice-three", dieValue: 3},
  {dieFace: "dice-four", dieValue: 4},
  {dieFace: "dice-five", dieValue: 5},
  {dieFace: "dice-six", dieValue: 6}
];

class App extends Component {

  constructor(props) {
    // Maybe just have a round object (ha ha)
    super(props);
    this.state = {
        buttonText: "Roll",
        diceRolls: INITIAL_DICE,
        roundOver: false,
        roundMessage: "",
        roundTick: 0
    }

    this.onDiceRoll = this.onDiceRoll.bind(this);
    this.onLockDie = this.onLockDie.bind(this);
    this.checkRound = this.checkRound.bind(this);
    this.onResetDice = this.onResetDice.bind(this);
  };

  componentDidMount() {

  }

  // lockDie passes down to child
  onLockDie = (i) => {
    console.log("onLockDie");
    console.log(i);

    this.setState(prevState => {
      return {
        // Checks matching Die index, toggles lockDie property
        diceRolls: prevState.diceRolls.map((die, dieIndex) => {
          if(i === dieIndex && this.state.roundTick > 0) {
            return {
              dieFace: die.dieFace,
              dieValue: die.dieValue,
              dieLocked: !die.dieLocked
            } 
          } else {
              return die;
          }
        })
      };
    }, () => {
      console.log("DIE INDEX MATCH");
      console.log(this.state.diceRolls);
    });
}

  // Resets dice faces and values
  onResetDice = () => {
    this.setState({
      buttonText: "Roll",
      diceRolls: INITIAL_DICE,
      roundTick: 0,
      roundOver: false,
      roundMessage: ""
    });
  };

  // Rolls dice - generate random faces and values, update state... but why won't this render child component?!
  onDiceRoll = () => {
    
    this.setState(prevState => {
      return {
        diceRolls: prevState.diceRolls.map(die => {

          // Generates random number 0-5, assigns strings and integer
          const randomNumber = (Math.floor(Math.random() * DICE_DATA_ARRAY.length));
          const rolledDieFace = DICE_DATA_ARRAY[randomNumber].dieFace;
          const rolledDieValue = DICE_DATA_ARRAY[randomNumber].dieValue;

          // is this die locked? Yes? Return previous state
          if (die.dieLocked) {
            return {
              dieFace: die.dieFace,
              dieValue: die.dieValue,
              dieLocked: die.dieLocked,
            };
          } else {
            // It's not locked so return new values
            return {
              dieFace: rolledDieFace,
              dieValue: rolledDieValue,
              dieLocked: die.dieLocked,
            };
          }

        }),
        roundTick: prevState.roundTick + 1
      }
    }, () => {
      // Check win or lose
      this.checkRound();
      // Check if game is over, then call reset
      if (this.state.roundOver) this.onResetDice();
    });
    // This is a no-no...
    // this.forceUpdate();
  };

  // Check for wins (show you win, resets), losses (show you lost, resets)
  // Lose condition: you go over 3 turns without meeting all match
  // Win condition: you roll all matches before 3 turns
  checkRound = () => {
    
    // Check match ( you can roll all the same the first time) 
    const diceRolls = this.state.diceRolls;
    const isTheSame = (dieValue) => dieValue.dieValue === diceRolls[0].dieValue;
    console.log("CHECKROUND");
    console.log(diceRolls.every(isTheSame));
    const diceMatch = diceRolls.every(isTheSame);
    
    // Honestly this is just me being extra.
    if (diceMatch && this.state.roundTick == 1) {
      this.setState({
        roundMessage: "Nice! Lucky first roll!",
        buttonText: "Try Again",
        roundOver: true
      });
    }
    else if (diceMatch && this.state.roundTick < 3) {
      this.setState({
        roundMessage: "You win!",
        buttonText: "Try Again",
        roundOver: true
      });
    } 
    else if (this.state.roundTick < 3) {
       // nothing happens
    } 
    else {
      this.setState({
        roundMessage: "Too bad you didn't win...",
        buttonText: "Try Again",
        roundOver: true
      });
    }
  };

  render() {
    // WHY WON'T IT RENDER?!
    // console.log("Render in App, diceRolls state:");
    // console.log(this.state.diceRolls);
    
    const diceRolls = this.state.diceRolls.map((die, i) => {
      // console.log('in App render loop nao');
      // console.log(die);
      return (
        <Die key={i} dieFace={die.dieFace} dieValue={die.dieValue} onLockDie={()=>this.onLockDie(i)} dieLocked={die.dieLocked} />
      );
    })

    return (
      <div className="App container">
        <div className="row center-align">
          <h1>Dice Game</h1>
          <h4>Round:</h4>
          <h4>{this.state.roundTick || "Start Rolling!"}</h4>
          <h3>{this.state.roundMessage}</h3>
          <div className="column">
            { diceRolls }
          </div>
        </div>
  
        <div className="column center-align">
          <GameButton onDiceRoll={this.onDiceRoll} buttonText={this.state.buttonText}/>
          {/* <div className="button-container">
            <a onClick={this.onDiceRoll} className="deep-orange darken-1 btn-large">{this.state.buttonText}</a>
          </div> */}
        </div>
        
      </div>
    );
  }
  
}

export default App;
