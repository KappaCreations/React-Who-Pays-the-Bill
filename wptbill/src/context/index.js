import React, { Component } from 'react';

const MyContext = React.createContext();

class MyProvider extends Component {

  state = {
    stage: 1,
    players: [],
    result: ''
  }

  addPlayerHandler = (name) => {
    this.setState((prevState) => ({
      players: [
        ...prevState.players,
        name
      ]

    }))


  }

  nextHandler = () => {
    const { players } = this.state

    if (this.state.stage === 2) {
      this.setState({
        stage: 1
      })
      this.setState({
        players: []
      })
    }



    else if (players.length < 2) {
      console.log('too few')
    }
    else {
      this.generateLooser()
      this.setState({
        stage: 2
      })
    }



  }


  removePlayerHandler = (idx) => {
    let newArray = this.state.players;
    newArray.splice(idx, 1);
    this.setState({ players: newArray });
  }

  generateLooser = () => {
    const { players } = this.state;
    this.setState({
      result: players[Math.floor(Math.random() * players.length)]
    })
  }



  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        addPlayer: this.addPlayerHandler,
        removePlayer: this.removePlayerHandler,
        next: this.nextHandler,
        getLooser: this.generateLooser,
      }}>
        {this.props.children}
      </MyContext.Provider>


    )
  }

}


export {
  MyContext,
  MyProvider
}