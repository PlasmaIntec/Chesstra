import React from 'react';
import ReactDOM from 'react-dom';

var socket = io();  

import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: []
    };

    this.selectTile = this.selectTile.bind(this);
  }

  componentDidMount() {
    socket.emit('new player');
    socket.on('mess', (conn) => {
      console.log(conn);
    });
    socket.on('state', (state) => {
      // console.log('receive state', state);
      this.setState({
        board: state
      });
    });
    // REFACTOR TO REQUEST BOARD FROM SERVER
    var board = Array(8);
    for (let i = 0; i < board.length; i++) {
      board[i] = Array(8);
    }
    board.forEach(row => row.fill(1));
    this.setState({
      board: board
    });
  }

  selectTile(e) {
    var row = e.target.dataset.row;
    var col = e.target.dataset.col;
    socket.emit('move', row, col);
    var classes = Array.prototype.slice.call(e.target.classList);
    if (classes.includes('red')) {
      e.target.classList.remove('red');
    } else {
      e.target.classList.add('red');      
    }
  }

  render() {
  	return (
  		<div className='fullHeight'>
  			<Board 
          board={this.state.board}
          selectTile={this.selectTile}
        />
  		</div>
  	);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));