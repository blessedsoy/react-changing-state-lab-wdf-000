const React = require('react');
const Board = require('./Board');
const Status = require('./Status');
const solutions = require('./solutions');


const INITIAL_STATE = {
  board: [
    null, null, null,
    null, null, null,
    null, null, null
  ],
  turn: 'X'
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleReset (ev) {
    ev.preventDefault();
    this.setState(INITIAL_STATE)
  }

  handleClick (i, ev) {
    ev.preventDefault();
    const newBoard = this.state.board.slice();
    newBoard.splice(i, 1, this.state.turn)
    this.setState({
      board: newBoard,
      turn: this.state.turn === 'X' ? 'O' : 'X'
    })
  }

  getWinner () {
    for (var i = 0; i < solutions.length; i++){
      if (this.state.board[solutions[i][0]] !== null && 
          this.state.board[solutions[i][0]] === this.state.board[solutions[i][1]] && 
          this.state.board[solutions[i][0]] === this.state.board[solutions[i][2]] ){
        return this.state.board[solutions[i][0]];
      }
    } 
  }

  isComplete () {
    return this.state.board.filter(player => player === null).length === 0 || this.getWinner() !== undefined 
  }

  render () {
    return (
      <div className='game'>
        <Board board={this.state.board} onClick={this.handleClick} />
        { this.isComplete() ? <Status winner={this.getWinner()} /> : null}
        <button className='game__reset' onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

module.exports = Game;
